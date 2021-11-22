import React, { Fragment } from 'react';

const List = ({ list }) => {
    return (
        <Fragment>
            {list.map((i) => {
                const { id, name, age, image } = i;
                return (
                    <article key={id} className="person">
                        <img src={image} alt={name} />
                        <div>
                            <h4>{name}</h4>
                            <p>{age}</p>
                        </div>
                    </article>
                );
            })}
        </Fragment>
    );
};

export default List;
