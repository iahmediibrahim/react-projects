import React, { useEffect } from 'react';

const Alert = ({ msg, type, showAlert }) => {
    useEffect(
        () => {
            const alert = setTimeout(() => showAlert(), 3000);
            return () => {
                clearTimeout(alert);
            };
        },
        [ msg ],
    );
    return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
