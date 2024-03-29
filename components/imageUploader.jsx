const _ = lodash;

ImageUploader = React.createClass({
  propTypes: {
    parentId: React.PropTypes.string.isRequired,
    close: React.PropTypes.func,
    imageCount: React.PropTypes.number
  },

  handleImageUpload(files) {
    _.map(files, (file) => {
      let uploader = new Slingshot.Upload('fileUploads');
      uploader.send(file, (error, url) => {
        if (error) {
          console.error('Error uploading', uploader.xhr.response);
        } else {
          Meteor.call('newImage', {
            name: file.name,
            filename: file.name,
            src: url,
            parent: this.props.parentId,
            created_at: Date.now(),
            uploaded_by: Meteor.userId(),
            order: this.props.imageCount++
          }, (err, success) => {
            Session.set('toast', `${file.name} added to the project`);
          });
        }
      });

      return uploader;
    });
  },

  render() {
    return (
      <Dropzone
        className="image-uploader"
        activeClassName="is-active"
        onDrop={this.handleImageUpload}
        accept="image/*"
        multiple>
        <Icon
          type="close"
          className="image-uploader__close"
          onClick={this.props.close}/>
        <strong className="image-uploader__message">
          Drop or click to add images
        </strong>
      </Dropzone>
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
        uploaded_by: String,
        order: Number
      });

      let imageWithSameFileName = Images.find({
        filename: args.filename,
        parent: args.parent
      }).fetch();
      if(imageWithSameFileName.length > 0) {
        return Images.update(imageWithSameFileName[0]._id, {
          $set: {
            src: args.src,
            updated_at: Date.now(),
            order: args.order
          }
        });
      } else {
        return Images.insert(args);
      }
    }
  });
}
