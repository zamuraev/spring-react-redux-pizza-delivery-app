import React from 'react';

function Load(props) {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" style={{height: '120px', width: '120px', marginTop: '120px'}}>
                <span className="sr-only" />
            </div>
        </div>
    );
}

export default Load;
