import React, { useState } from 'react';
import data from './data';
import List from './List';
function App() {
    const [ list, setList ] = useState(data);
    const clearAll = () => {
        setList([]);
    };
    return (
        <main>
            <section className="container">
                <h3>{list.length} birthdays today</h3>
                <List list={list} />
                <button className="btn" onClick={clearAll}>
                    Clear all
                </button>
            </section>
        </main>
    );
}

export default App;
