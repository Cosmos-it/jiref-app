import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types'

const InputGroup = (
	{
		name,
		placeholder,
		value,
		label,
		error,
		info,
		icon,
		type,
		onChange
	}

) => {

	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input type={type}
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				label={label}
				onChange={onChange}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <small className="invalid-feedbook">{error}</small>}
		</div>
	);
};

InputGroup.prototype = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
}

InputGroup.defaultProps = {
	type: 'text'
}

export default InputGroup;