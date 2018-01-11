import React from 'react';
import classnames from 'classnames';
import PropTypes from 'react-proptypes';

/**
 * form field
 * @function FormField
 * @param {object} props
 * @return {XML} JSX
 */
const FormField = ({ onChange, type, name, label, value, errors }) => (
  <div className="form-group">
    <label className={ 'form-control-label' } htmlFor={ name }>{ label }</label>
    <input
      onChange={ onChange }
      type={ type || 'text' }
      className={ classnames('form-control', { 'is-invalid': errors && errors[name] }) }
      name={ name }
      id={ name }
      value={ value }
    />
    { errors && errors[name] ?
      <div className="invalid-feedback">
        { errors[name] }
      </div> : false
    }
  </div>
);

FormField.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  errors: PropTypes.object
};
export default FormField;
