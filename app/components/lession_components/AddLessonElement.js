import React from 'react';
import FormInput from '../common_components/FormInput';
import Select from '../common_components/SelectInput';
import PreviewInput from '../common_components/PreviewInput';

class AddLessonElement extends React.Component {
  constructor() {
    super();
    this.state = {
      element: {
        type: '',
        word: '',
        file: [null]
      },
      wordTypes: ['Animals', 'Vehicles', 'People', 'Toys'],
      errors: {},
      submitted: false
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
  }

  fileObj = [];

  fileArray = [];

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
            resolve(ev.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        });
      })
    ).then(
      // eslint-disable-next-line promise/always-return
      images => {
        this.fileArray.push(images);
        /* Once all promises are resolved, update state with image URI array */
        this.setState({ element: { file: this.fileArray } });
      },
      // eslint-disable-next-line no-shadow
      error => {
        console.error(error);
      }
    );
  }

  render() {
    const { submitted, errors, word } = this.state;
    return (
      <div>
        <h2>Add new lesson element</h2>
        <Select
          title="Type"
          name="type"
          options={this.state.wordTypes}
          value={this.state.element.type}
          placeholder="Select a type"
          handleChange={this.handleInput}
        />
        <FormInput
          label="Word"
          name="word"
          type="text"
          value={word}
          onChange={this.handleChange}
          placeholder="Enter a word"
          error={errors.word}
          required
          className="input"
        />
        <PreviewInput
          label="Picture"
          onChange={this.uploadMultipleFiles}
          files={this.fileArray}
        />
      </div>
    );
  }
}

export default AddLessonElement;
