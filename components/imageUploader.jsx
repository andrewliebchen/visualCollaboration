ImageUploader = React.createClass({
  propTypes: {
    parentId: React.PropTypes.string.isRequired
  },

  handleImageUpload(files) {
    let file = files[0];
    let uploader = new Slingshot.Upload('fileUploads');

    uploader.send(file, (error, url) => {
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
      } else {
        // Will have to check if file exists first
        Meteor.call('newImage', {
          name: file.name,
          filename: file.name,
          src: url,
          parent: this.props.parentId,
          created_at: Date.now(),
          uploaded_by: Meteor.user()._id
        });
      }
    });
  },

  render() {
    return (
      <Dropzone
        className="image-uploader"
        activeClassName="is-active"
        onDrop={this.handleImageUpload}
        multiple={false}
        accept="image/*"/>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    newImage(args) {
      check(args, {
        name: String,
        filename: String,
        src: String,
        parent: String,
        created_at: Number,
        uploaded_by: String
      });

      return Images.insert(args);
    }
  });
}
