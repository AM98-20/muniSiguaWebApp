import React from 'react';
import './Input.css';

export const PrimaryInput = (
    {
        label,
        type,
        name,
        placeholder,
        value,
        error,
        info,
        customClassName = [],
        onChange: onChangeHandler = () => { },
        ...rest
    }
) => {
    return (
        <div className={['primary_input custom_input', ...customClassName].join(' ')}>
            <label htmlFor="">{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChangeHandler}
                {...rest}
            />
            {
                info &&
                <span className='field_info'>*{info}</span>
            }
            {
                error &&
                <span className='field_error'>*{error}</span>
            }
        </div>
    );
}

export const SecondaryInput = (
    {
        label,
        type,
        name,
        placeholder,
        value,
        error,
        info,
        customClassName = [],
        onChange: onChangeHandler = () => { },
        ...rest
    }
) => {
    return (
        <div className={['secondary_input custom_input', ...customClassName].join(' ')}>
            <label htmlFor="">{label}</label>
            <div className="">
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChangeHandler}
                    {...rest}
                />
                {
                    info &&
                    <span className='field_info'>*{info}</span>
                }
                {
                    error &&
                    <span className='field_error'>*{error}</span>
                }
            </div>
        </div>
    );
}
export const ModernInput = (
    {
        label,
        type,
        name,
        placeholder,
        value,
        error,
        info,
        customClassName = [],
        onChange: onChangeHandler = () => { },
        ...rest
    }
) => {
    return (
        <div className={['modern_input custom_input', ...customClassName].join(' ')}>
            <label htmlFor="">{label}</label>
            <div className="">
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChangeHandler}
                    {...rest}
                />
                {
                    info &&
                    <span className='field_info'>*{info}</span>
                }
                {
                    error &&
                    <span className='field_error'>*{error}</span>
                }
            </div>
        </div>
    );
}