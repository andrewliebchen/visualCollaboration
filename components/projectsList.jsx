ProjectsList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let projects = Meteor.subscribe('projects', Meteor.userId());

    return {
      loading: !projects.ready(),
      projects: Projects.find({}, {sort: {created_at: -1}}).fetch()
    }
  },

  render() {
    if (this.data.loading) {
      return <Loading/>;
    }

    return (
      <div className="projects">
        <header className="header project__header">
          <a className="block brand" href="/">💅</a>
          <h2 className="header__title">Projects</h2>
          <a className="add-project block brand">
            <Icon type="plus"/>
          </a>
        </header>
        <div className="thumbnails thumbnails_project">
          {this.data.projects.map((project, i) => {
            return (
              <ProjectThumbnail project={project} key={i}/>
            );
          })}
        </div>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/', {
    action() {
      ReactLayout.render(ProjectsList);
    }
  });
}
