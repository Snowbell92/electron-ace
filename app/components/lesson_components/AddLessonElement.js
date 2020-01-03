import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import FormInput from '../common_components/FormInput';
import Select from '../common_components/SelectInput';
import PreviewInput from '../common_components/PreviewInput';
import { editActions } from '../../actions/edit.actions';

class AddLessonElement extends React.Component {
  constructor() {
    super();
    this.state = {
      element_word: '',
      // eslint-disable-next-line react/no-unused-state
      element_wordType: '',
      images: [null],
      wordTypes: ['Animals', 'Vehicles', 'People', 'Toys'],
      errors: {},
      pending: false,
      submitted: false
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectChange(e) {
    this.setState({ element_type: e.target.value });
  }

  handleWordChange(e) {
    this.setState({ element_word: e.target.value });
  }

  // eslint-disable-next-line class-methods-use-this
  handleSubmit(e) {
    e.preventDefault();
    const element = {
      word: '' || this.state.element_word,
      wordType: '' || this.state.element_type,
      images: this.state.images
    };
    this.setState({ pending: true });
    if (element) {
      this.props.pending(element);
    }
  }

  fileObj = [];

  fileArray = [];

  // TODO: seperate video, audio and image validation
  validExtensions = ['.png', '.jpg', '.mp4', '.mp3'];

  hasExtension(fileName, extesions) {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    const pattern = `(${extesions.join('|').replace(/\./g, '\\.')})$`;
    return new RegExp(pattern, 'i').test(fileName);
  }

  uploadMultipleFiles(e) {
    /* Get files in array form */
    const files = Array.from(e.target.files);
    /* Map each file to a promise that resolves to an array of image URI's */
    // eslint-disable-next-line promise/catch-or-return
    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', ev => {
            // eslint-disable-next-line react/prop-types
            if (!this.hasExtension(file.name, this.validExtensions)) {
              this.setState({
                errors: { fileError: 'extension not supported' }
              });
              reject(new Error('Extension not supported'));
            }
            resolve(ev.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        });
      })
    ).then(
      // eslint-disable-next-line promise/always-return
      images => {
        // eslint-disable-next-line promise/always-return
        const string = images.toString().split(';base64,')[0];
        console.log(string);
        this.fileArray.push(images);
        /* Once all promises are resolved, update state with image URI array */
        this.setState({ images: this.fileArray }, function() {
          console.log(this.state.images);
        });
      },
      // eslint-disable-next-line no-shadow
      error => {
        console.error(error);
      }
    );
  }

  render() {
    const { pending, errors } = this.state;
    return (
      <>
        <div className="title-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Add new lesson element</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="add-element">
          <form name="element_form" onSubmit={this.handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <Select
                    title="Type"
                    name="type"
                    options={this.state.wordTypes}
                    value={this.state.element_type}
                    placeholder="Select a type"
                    handleChange={this.handleSelectChange}
                  />
                  <FormInput
                    label="Word"
                    labelClassName="col-sm-2 col-form-label"
                    name="word"
                    type="text"
                    value={this.state.element_word}
                    onChange={this.handleWordChange}
                    placeholder="Enter a word"
                    error={errors.word}
                    required
                    className="form-control"
                    inputContainerClassName="col-sm-10"
                  />
                  <PreviewInput
                    name="files"
                    label="Picture"
                    onChange={this.uploadMultipleFiles}
                    files={this.fileArray}
                    error={errors.fileError}
                  />
                </div>
              </div>
            </div>
            <div className="grouped-button-bottom-bar">
              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <Popup
                      trigger={
                        <button className="btn btn-default" type="button">
                          Cancel
                        </button>
                      }
                      modal
                    >
                      {close => (
                        <div className="warning-modal">
                          <div>
                            <h4>Are you Sure?</h4>
                            <p>
                              No changes will be saved. please click confirm to
                              discard all information
                            </p>
                            <Link to="/" className="btn btn-default">
                              Confirm
                            </Link>
                            <button
                              className="btn btn-light"
                              type="button"
                              onClick={() => {
                                console.log('modal closed ');
                                close();
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

function mapState(state) {
  const { pending } = state.editForm;
  return { pending };
}

const actionCreators = {
  pending: editActions.pending
};

const connectedElementForm = connect(
  mapState,
  actionCreators
)(AddLessonElement);

// eslint-disable-next-line import/prefer-default-export
export { connectedElementForm as AddLessonElement };
