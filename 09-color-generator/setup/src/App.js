import React, { Fragment, useState } from 'react';
import SingleColor from './SingleColor';

import Values from 'values.js';

function App() {
    const [ color, setColor ] = useState('');
    const [ error, setError ] = useState(false);
    const [ list, setList ] = useState(new Values('#f15025').all(10));
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            let colors = new Values(color).all(10);
            setList(colors);
            setError(false);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    };
    return (
        <Fragment>
            <section className="container">
                <h3>color generator</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        className={`${error ? 'error' : null}`}
                        type="text"
                        placeholder="#f15025"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <button type="submit" className="btn">
                        generate
                    </button>
                </form>
            </section>
            <section className="colors">
                {list.map((color, index) => <SingleColor key={index} {...color} hex={color.hex} index={index} />)}
            </section>
        </Fragment>
    );
}

export default App;
