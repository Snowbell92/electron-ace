/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import { editNewLessonActions } from '../../actions/editNewLesson';

class AddLesson extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      // eslint-disable-next-line react/no-unused-state
      thumbnail: [null],

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

    const lesson = {
      name: '' || this.state.name,
      thumbnail: this.state.thumbnail[0]
    };
    this.setState({ pending: true });
    // eslint-disable-next-line eqeqeq
    if (lesson) {
      // eslint-disable-next-line react/prop-types
      this.props.pending(lesson);
    }
  }

  fileObj = [];

  fileArray = [];

  // TODO: seperate video, audio and image validation
  validExtensions = ['.png', '.jpg', '.mp4', '.mp3'];

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
    return (
      <div>
        <h3>Add New Lesson</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Lesson Name:
            <input
              type="text"
              placeholder="Enter Lesson Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />
          </label>{' '}
          <br />
          <br />
          <p>Choose Lesson Tumbnail</p>
          <input
            type="file"
            placeholder="Browse..."
            accept="image/*"
            onChange={this.fileSelectedHandler}
          />
          <p className="right">
            This Lesson thubnail is used for preview.
            <br />
            Use an image that is esaily recognizable to you.
          </p>
          <br />
          <div className="right">
            {' '}
           {/* <input type="submit" value="Submit" /> */}
            <button type="submit">Save</button>
          </div>
          <hr />
          <Link to="/AddNoun"> Click to complete Step 1</Link>
        </form>
        {/* <input type="file" onChange={this.fileSelectedHandler}/> */}
      </div>
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
