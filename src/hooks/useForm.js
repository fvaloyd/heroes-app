import { useState } from 'react';

export const useForm = ( initialValue = {} ) => {
    
    const [formState, setFormState] = useState( initialValue );

    const handleInputChange = ({ target }) => {
        setFormState({
            ...formState,
            [ target.name ]: target.value
        });
    }

    const reset = () => {
        setFormState(initialValue);
    }

    return [ formState, handleInputChange, reset ];
}