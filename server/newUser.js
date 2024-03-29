Accounts.onCreateUser((options, user) => {
  user.profile = user.profile || {};

  user.profile.name = user.services.google.name;
  user.profile.avatar_src = user.services.google.picture;
  user.profile.email = user.services.google.email;
  user.profile.onboarded = false;
  user.profile.authenticated = true;

  return user;
});
