AccountsUIWrapper = React.createClass({
  componentDidMount() {
    this.view = Blaze.render(Blaze.Template.loginButtons,
      React.findDOMNode(this.refs.container));
  },

  componentWillUnmount() {
    Blaze.remove(this.view);
  },

  render() {
    return <div className="session__wrapper" ref="container" />;
  }
});
