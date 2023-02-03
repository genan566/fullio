import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import { colourOptions } from '../data';

const animatedComponents = makeAnimated();
const options = [
    { value: 'chocolate', label: 'Chocolate', },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
export default function AnimatedMulti() {
    return (
        <Select
            onChange={(e) => console.log(e)}
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[options[2], options[1]]}
            isMulti
            options={options}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "black",
                    borderColor: state.isFocused ? 'grey' : 'red',
                }),
            }}
        />
    );
}