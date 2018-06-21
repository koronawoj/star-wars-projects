import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';


const Loading = () => (
    <div
        style={{
            position: 'absolute',
            top: '0',
            right: '0',
            left: '0'
        }}>
        <LinearProgress/>
    </div>
)

export default Loading;