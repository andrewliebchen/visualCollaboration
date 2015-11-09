App = React.createClass({
  render() {
    return (
      <div className="wrapper">
        {Meteor.user() ?
          <span>
            <Header/>
            <ProjectsList/>
          </span>
        :
          <span>
            <AccountsUIWrapper/>
          </span>
        }
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/', {
    action() {
      ReactLayout.render(App);
    }
  });
}