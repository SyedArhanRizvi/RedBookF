import React from 'react';
import "./Card.css";
import { Link } from 'react-router-dom';

function Card({book}) {
    const bookID = book._id;
  return (
    <div className='card'>
      <div className="img"><img src={book.bookCoverImg} alt="" /></div>
      <div className="read">
        <h2>{book.bookName}</h2>
        <p><b>{book.bookTitle}</b></p>
      </div>
      <div className="btns">
        <button className='red'><Link to={`/readWholeBook/${bookID}`}>Read</Link></button>
        <button className='green'>WishList</button>
      </div>
    </div>
  )
}

export default Card
