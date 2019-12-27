import React from 'react';

class PreviewInput extends React.Component {
  render() {
    return (
      <>
        <div className="button">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="multi">{this.props.label}</label>
          <button type="button">Browse</button>
          <input
            type="file"
            id="multi"
            onChange={this.props.onChange}
            multiple
          />
        </div>
        <div className="form-group multi-preview">
          {(this.props.files || []).map(url => (
            <img src={url} alt="preview" />
          ))}
        </div>
      </>
    );
  }
}

export default PreviewInput;
