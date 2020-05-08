/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import { editNewLessonActions } from '../../actions/editNewLesson';
import FormInput from '../common_components/FormInput';
import Select from '../common_components/SelectInput';
import PreviewInput from '../common_components/PreviewInput';

class AddLesson extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      // eslint-disable-next-line react/no-unused-state
      thumbnail: [null],
      thumbnailPath: '',
      submitted: false,
      errors: {},
      // eslint-disable-next-line react/no-unused-state
      pending: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //  this.fileSelectedHandler=this.fileSelectedHandler.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
    // console.log(value);
  }

  handleSubmit(event) {
    // eslint-disable-next-line no-alert
    alert(`A name was submitted: ${this.state.name}`);
    // eslint-disable-next-line spaced-comment
    event.preventDefault();
    console.log(this.state.name);
    console.log(this.state.thumbnail[0]);

    const lesson = {
      name: '' || this.state.name,
      thumbnail: this.state.thumbnailPath
    };
    this.setState({ pending: true });
    // eslint-disable-next-line eqeqeq
    if (lesson) {
      // eslint-disable-next-line react/prop-types
      this.props.pending(lesson);
      //  editNewLessonActions.pending(lesson);
    }
  }

  fileObj = [];

  fileArray = [];

  // TODO: seperate video, audio and image validation
  validExtensions = ['.png', '.jpg'];

  // eslint-disable-next-line class-methods-use-this
  hasExtension(fileName, extesions) {
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    const pattern = `(${extesions.join('|').replace(/\./g, '\\.')})$`;
    return new RegExp(pattern, 'i').test(fileName);
  }

  fileSelectedHandler = e => {
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
      thumbnail => {
        // eslint-disable-next-line promise/always-return
        const string = thumbnail.toString().split(';base64,')[0];
        console.log(string);
        this.fileArray.push(thumbnail);
        /* Once all promises are resolved, update state with image URI array */
        // eslint-disable-next-line func-names
        this.setState({ thumbnailPath: string });
        this.setState({ thumbnail: this.fileArray }, function() {
          console.log(this.state.thumbnail[0]);
        });
      },
      // eslint-disable-next-line no-shadow
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { pending, errors } = this.state;
    return (
      <>
        <div className="title-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h3>Add new lesson</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="add-element">
          <form name="element_form" onSubmit={this.handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <FormInput
                    label="Name"
                    labelClassName="col-sm-2 col-form-label"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Enter Lesson Name"
                    error={errors.word}
                    required
                    className="form-control"
                    inputContainerClassName="col-sm-10"
                  />
                  <PreviewInput
                    name="thumbnail"
                    label="Thumbnail"
                    onChange={this.fileSelectedHandler}
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
                    <Link
                      to={{
                        pathname: '/addLessonElement',
                        state: {
                          name: this.state.name
                        }
                      }}
                      className="btn btn-link"
                    >
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </Link>
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
  pending: editNewLessonActions.pending
};

const connectedElementForm = connect(mapState, actionCreators)(AddLesson);

// eslint-disable-next-line import/prefer-default-export
export { connectedElementForm as AddLessonPage };
