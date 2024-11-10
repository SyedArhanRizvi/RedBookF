import React, { useEffect, useState } from 'react';
import "./Wishlist.css";
import Card from '../../Cards/Card';
import axios from 'axios';
function Wishlist({redBookUser}) {
  const [wishlist, setWishlist] = useState(redBookUser && redBookUser.wishlist);
  const [wishlistBook, setWishlistBooks] = useState([]);
  const [wController, setWController] = useState(false);
  useEffect(()=>{
    if(wishlist) {

      // This is wishlist function ::
    const getAllWishListProd = async (id)=>{
      try {
        const book = await axios.get(`http://localhost:3500/api/books/readThisBook${id}`);
        console.log("This is wishlist added book ", book.data.book);
        setWishlistBooks((prev)=>[book.data.book, ...prev])
      } catch (error) {
        console.log("There is some issus in your get all wishlist prods plz fix the bug first ", error);  
      }
    }

    // And this is approach ::
    wishlist.map((id)=>{
      return getAllWishListProd(id);
    });
  }
  }, [wController]);
  // console.log(wishlistBook && wishlistBook, "WOrk done");
  
  return (
    <div className='wishlistSection'>
     {
      !wishlistBook ? <h1>There is no book available in your wishlist.</h1> :
      wishlistBook.map((book)=>{
        return <Card book={book} setWController={setWController}></Card>;
      })
     }
    </div>
  )
}
export default Wishlist;
