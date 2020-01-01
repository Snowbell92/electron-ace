import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  name,
  type,
  placeholder,
  onChange,
  className,
  value, // eslint-disable-next-line react/prop-types
  error, // eslint-disable-next-line react/prop-types
  children, // eslint-disable-next-line react/prop-types
  label, // eslint-disable-next-line no-unused-vars
  ...props
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        style={error && { border: 'solid 1px red' }}
      />
      {error && <p>{error}</p>}
    </>
  );
};

FormInput.defaultProps = {
  type: 'text',
  className: ''
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  // type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  // eslint-disable-next-line no-dupe-keys
  type: PropTypes.oneOf(['text', 'number', 'password']),
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
};

export default FormInput;
