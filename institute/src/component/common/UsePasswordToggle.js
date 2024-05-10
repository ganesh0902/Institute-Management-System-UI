import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const UsePasswordToggle = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
            <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
            >
                <FontAwesomeIcon className='passwordToggle' icon={showPassword ? faEyeSlash : faEye} />
            </button>
        </div>
    );
}
export default UsePasswordToggle