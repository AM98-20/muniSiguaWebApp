import React from 'react';
import { BaseButton, PrimaryButton, SecondaryButton } from '../../Components/Form/Button/Button';
import { PrimaryInput, SecondaryInput, ModernInput } from '../../Components/Form/Input/Input';
import { Icon } from '@iconify/react';

const Sample = () => {

    const sampleContainer = {

    }

    return (
        <div className='content'>
            <h2>Samples</h2>
            <div style={sampleContainer}>
                <h3>Primary Input</h3>
                <PrimaryInput
                    label="First name"
                    type="text"
                    info="Este texto es de información"
                    error="Este texto es de error"
                />
            </div>
            <div style={sampleContainer}>
                <h3>Secondary Input</h3>
                <SecondaryInput
                    label="FN"
                    type="text"
                    info="Este texto es de información"
                    error="Este texto es de error"
                />
            </div>
            <div style={sampleContainer}>
                <h3>Modern Input</h3>
                <ModernInput
                    type="text"
                    placeholder="First Name"
                    info="Este texto es de información"
                    error="Este texto es de error"
                />
            </div>
            <div style={sampleContainer}>
                <h3>Sample Buttons</h3>
                <BaseButton style={{ backgroundColor: "#000", fontWeight: 'bold' }}>
                    Custom Black
                </BaseButton>
                <BaseButton style={{ backgroundColor: "blue", fontWeight: 'bold' }}>
                    <Icon icon='cil:save' />
                    With Icon
                </BaseButton>
                <PrimaryButton>
                    Primary
                </PrimaryButton>
                <SecondaryButton>
                    Secondary
                </SecondaryButton>
            </div>
        </div>
    )
}

export default Sample;