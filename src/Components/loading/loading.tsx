import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './loading.css';

const Loading = (props: { active: boolean }) => {
    if (props.active) {
        return (
            <div className='loading'>
                <FaSpinner className='spinner' />
            </div>
        )
    } else {
        return null;
    }

}

export default Loading;