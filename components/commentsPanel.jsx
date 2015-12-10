CommentsPanel = React.createClass({
  propTypes: {
    description: React.PropTypes.string,
    comments: React.PropTypes.array,
    parentId: React.PropTypes.string,
    canPin: React.PropTypes.bool
  },

  _scrollToBottom() {
    let scrollContainer = React.findDOMNode(this.refs.scrollContainer);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  },

  componentDidMount() {
    this._scrollToBottom();
  },

  componentDidUpdate() {
    this._scrollToBottom();
  },

  render() {
    let {description, comments, parentId, canPin} = this.props;
    return (
      <div className="panel__scroll panel__scroll_comments" ref="scrollContainer">
        <div className="project__description panel__content">
          <h3>Description</h3>
          <InlineEdit
            defaultValue={description}
            method="editProjectDescription"
            parentId={parentId}
            type="textarea"
            toast="Description up to date!"/>
        </div>
        <CommentsList
          comments={comments}
          parentId={parentId}
          canPin={canPin}/>
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    editProjectDescription(args) {
      check(args, {
        id: String,
        value: String,
      });

      return Projects.update(args.id, {
        $set: {
          description: args.value
        }
      });
    }
  });
}
