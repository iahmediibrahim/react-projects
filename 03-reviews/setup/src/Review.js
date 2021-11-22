import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
    const [ index, setIndex ] = useState(0);
    const { name, job, image, text } = people[index];
    const checkNumber = (number) => {
        if (number > people.length - 1) return 0;
        if (number < 0) return people.length - 1;
        return number;
    };
    const nextPerson = () => {
        setIndex((index) => checkNumber(index + 1));
    };
    const prevPerson = () => {
        setIndex((index) => checkNumber(index - 1));
    };
    const checkRandom = (number) => {
        if (number === index) return index + 1;
    };
    // const nextPerson = () => {
    //     if (index >= people.length - 1) {
    //         setIndex(index);
    //     } else {
    //         setIndex(index + 1);
    //     }
    // };
    // const prevPerson = () => {
    //     if (index === 0) {
    //         setIndex(index);
    //     } else if (index <= people.length - 1) {
    //         setIndex(index - 1);
    //     }
    // };
    return (
        <article className="review">
            <div className="img-container">
                <img src={image} alt={name} className="person-img" />
                <span className="quote-icon">
                    <FaQuoteRight />
                </span>
            </div>
            <h4 className="author">{name}</h4>
            <p className="job">{job}</p>
            <p className="info">{text}</p>
            <div className="button-container">
                <button className="prev-btn" onClick={prevPerson}>
                    <FaChevronLeft />
                </button>
                <button className="next-btn" onClick={nextPerson}>
                    <FaChevronRight />
                </button>
            </div>
            <button
                className="random-btn"
                onClick={() => checkNumber(checkRandom(setIndex(Math.floor(Math.random() * people.length))))}>
                surprise me
            </button>
        </article>
    );
};

export default Review;
