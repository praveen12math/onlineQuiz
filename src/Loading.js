import React from 'react';

const Loading = () => (
    <div style={{ backgroundColor: "#758AA2", height: "100vh" }} >
        <div className="justify-content-center loader">
            <img src="loader7.gif" alt="" />
        </div>
    </div>
);

export const LoadingForResult = () => {
    return (
        <div style={{ backgroundColor: "#758AA2", height: "100vh" }} >
            <div className="justify-content-center loader">
                <img src="loader4.gif" alt="" />
            </div>
        </div>
    );
}

export default Loading;