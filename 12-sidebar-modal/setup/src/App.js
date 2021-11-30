import React, { Fragment } from 'react';
import Modal from './Modal';
import Sidebar from './Sidebar';
import Home from './Home';
function App() {
    return (
        <Fragment>
            <Home />
            <Sidebar />
            <Modal />
        </Fragment>
    );
}

export default App;
