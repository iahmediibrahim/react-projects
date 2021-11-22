import React, { useState, useEffect, Fragment } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';
function App() {
    const [ loading, setLoading ] = useState(true);
    const [ tours, setTours ] = useState([]);

    const fetchTours = async () => {
        setLoading(true);

        try {
            const response = await fetch(url);
            const tours = await response.json();
            setLoading(false);
            setTours(tours);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        fetchTours();
    }, []);
    const removeTour = (id) => {
        const newTours = tours.filter((tour) => tour.id !== id);
        setTours(newTours);
    };
    return (
        <Fragment>
            {loading ? (
                <Loading />
            ) : (
                <main>
                    <Tours tours={tours} removeTour={removeTour} />
                </main>
            )}
            {!tours.length ? (
                <main>
                    <div className="title">
                        <h2>no tours left</h2>{' '}
                        <button className="btn" onClick={fetchTours}>
                            refresh
                        </button>
                    </div>
                </main>
            ) : null}
        </Fragment>
    );
}

export default App;
