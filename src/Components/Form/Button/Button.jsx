import React from 'react'
import './Button.css'

export const BaseButton = ({ children, className: customClassName, ...rest }) => {
    return (
        <button
            className={['button_base', customClassName].join(' ')}
            {...rest}
        >
            {children}
        </button>
    )
}

export const PrimaryButton = ({ children, className: customClassName, ...rest }) => {
    return (
        <BaseButton
            className={['button_primary', customClassName].join(' ')}
            {...rest}
        >
            {children}
        </BaseButton>
    );
}

export const SecondaryButton = ({ children, className: customClassName, ...rest }) => {
    return (
        <BaseButton
            className={['button_secondary', customClassName].join(' ')}
            {...rest}
        >
            {children}
        </BaseButton>
    );
}