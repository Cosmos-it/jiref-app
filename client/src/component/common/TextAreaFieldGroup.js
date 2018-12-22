import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// window.onload = function() {

// var observe;
// if (window.attachEvent) {
//     observe = function (element, event, handler) {
//         element.attachEvent('on'+event, handler);
//     };
// }
// else {
//     observe = function (element, event, handler) {
//         element.addEventListener(event, handler, false);
//     };
// }
// function init () {
//     var text = document.getElementById('text');
//     function resize () {
//         text.style.height = 'auto';
//         text.style.height = text.scrollHeight+'px';
//     }
//     /* 0-timeout to get the already changed text */
//     function delayedResize () {
//         window.setTimeout(resize, 0);
//     }
//     observe(text, 'change',  resize);
//     observe(text, 'cut',     delayedResize);
//     observe(text, 'paste',   delayedResize);
//     observe(text, 'drop',    delayedResize);
//     observe(text, 'keydown', delayedResize);

//     text.focus();
//     text.select();
//     resize();
// }
// init();

// }




const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea 

        className={classnames('input-textarea', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};


export default TextAreaFieldGroup;
