import React from 'react';
import PropTypes from 'prop-types';

class PreviewInput extends React.Component {
  render() {
    return (
      <>
        <div className="button">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,react/destructuring-assignment */}
          <label htmlFor="multi">{this.props.label}</label>
          <button type="button">Browse</button>
          <input
            name={this.props.name}
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
        {this.props.error && <p>{this.props.error}</p>}
      </>
    );
  }
}

PreviewInput.defaultProps = {
  error: 'Something went wrong'
};

PreviewInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  files: PropTypes.any
};

export default PreviewInput;
