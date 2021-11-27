import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
    const [ name, setName ] = useState('');
    const [ list, setList ] = useState(JSON.parse(localStorage.getItem('list')) || []);
    const [ isEditing, setIsEditing ] = useState(0);
    const [ alert, setAlert ] = useState({ show: false, type: '', msg: '' });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            showAlert(true, 'danger', 'please enter value');
        } else if (name && isEditing) {
            const newArray = [ ...list ];
            const objIndex = newArray.findIndex((obj) => obj.id == isEditing);
            newArray[objIndex].title = name;
            setList(newArray);
            setName('');
            setIsEditing(0);
            showAlert(true, 'success', 'item edited');
        } else {
            showAlert(true, 'success', 'Item added to the list!');
            const newItem = { id: new Date().getTime().toString(), title: name };
            setList([ ...list, newItem ]);
            setName('');
        }
    };
    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({ show, type, msg });
    };
    const removeItem = (id) => {
        setList(list.filter((item) => item.id !== id));
        showAlert(true, 'danger', 'Item Removed');
    };
    const editItem = (id) => {
        setIsEditing(id);
        const name = list.find((item) => item.id === id).title;
        setName(name);
        showAlert(true, 'success', 'edit item');
    };
    useEffect(
        () => {
            localStorage.setItem('list', JSON.stringify(list));
        },
        [ list ],
    );
    return (
        <section className="section-center">
            <form className="grocery-form" onSubmit={handleSubmit}>
                {alert.show && <Alert {...alert} showAlert={showAlert} />}
                <h3>grocery bud</h3>
                <div className="form-control">
                    <input
                        type="text"
                        className="grocery"
                        placeholder="e.g eggs"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit" className="submit-btn">
                        {isEditing ? 'edit' : 'submit'}
                    </button>
                </div>
            </form>
            {list.length > 0 && (
                <div className="grocery-container">
                    <List items={list} removeItem={removeItem} editItem={editItem} />
                    <button
                        className="clear-btn"
                        onClick={() => {
                            setList([]);
                            setName('');
                            showAlert(true, 'success', 'Items Cleared');
                        }}>
                        clear items
                    </button>
                </div>
            )}
        </section>
    );
}

export default App;
