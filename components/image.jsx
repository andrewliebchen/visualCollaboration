Image = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      image: Images.findOne(),
      comments: Comments.find({}, {sort: {created_at: 1}}).fetch()
    };
  },

  getInitialState() {
    return {
      panel: FlowRouter.getQueryParam('show') === 'comments'
    };
  },

  handlePanelToggle() {
    this.setState({panel: !this.state.panel});
    FlowRouter.setQueryParams({show: this.state.panel ? null : 'comments'});
  },

  renderPanelNav() {
    return (
      <nav className="panel-nav">
        <Icon
          type="comments"
          className={`block action${this.state.panel ? ' is-selected' : ''}`}
          onClick={this.handlePanelToggle}/>
      </nav>
    )
  },

  render() {
    let {comments, image} = this.data;
    return (
      <div className="image wrapper">
        <header className="header">
          <h2 className="header__title">{image.name}</h2>
          <a className="block header__back" href={`/${image.parent}`}><Icon type="arrowLeft"/></a>
          {this.renderPanelNav()}
        </header>
        <Container hasPanel={this.state.panel}>
          <Main className="image__main">
            <img className="image__img" src={image.src}/>
            {this.state.panel ?
              <Pins parentId={image._id}/>
            : null}
          </Main>
          {this.state.panel ?
            <Panel
              open={this.handlePanelToggle}
              close={this.handlePanelToggle}
              nav={this.renderPanelNav()}>
              <div className="panel__content">
                {image.description ?
                  <p>{image.description}</p>
                : null}
                <CommentsList comments={comments} parentId={image._id} canPin/>
              </div>
            </Panel>
          : null}
        </Container>
      </div>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/images/:_id', {
    subscriptions(params) {
      this.register('image', Meteor.subscribe('image', params._id));
    },

    action(params) {
      FlowRouter.subsReady('image', () => {
        ReactLayout.render(Image);
      });
    }
  });
}
