Meteor.publish(null, () => {
  return Meteor.roles.find({});
});

Meteor.publish('project', (id) => {
  check(id, String);

  return [
    Projects.find({_id: id}),
    Images.find({parent: id}),
    Comments.find({parent: id})
  ];
});

Meteor.publish('image', (id) => {
  check(id, String);

  // Check to be sure we actually have an image...
  let image = Images.findOne(id);
  if(!image) {
    return [];
  }

  return [
    Images.find({parent: image.parent}), // Wish this could be limited to current image + next/prev
    Comments.find({parent: id}),
    Projects.find({_id: image.parent})
  ];
});

Meteor.publish('userProjects', (id) => {
  check(id, String);
  return Projects.find({created_by: id});
});

Meteor.publish('user', (id) => {
  check(id, String);
  return Meteor.users.find({_id: id});
});

Meteor.publish('admin', () => {
  return [
    Invites.find(),
    Meteor.users.find(),
    Projects.find()
  ];
});

Meteor.publish('token', (token) => {
  check(token, String);
  return Invites.find({token: token});
});
