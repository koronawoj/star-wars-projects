import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';


const Loading = () => (
    <div
        style={{
            position: 'fixed',
            top: '0',
            right: '0',
            left: '0',
            zIndex: '9999'
        }}>
        <LinearProgress/>
    </div>
)

export default Loading;