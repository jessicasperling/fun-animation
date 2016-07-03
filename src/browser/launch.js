import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app.jsx';

export default function launch() {
    render(
        <App />,
        document.getElementById('container')
    );
}

launch();
