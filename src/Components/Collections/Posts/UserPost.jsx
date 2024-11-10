import React, { useState } from 'react';
import "./UserPost.css";
import UserPCard from '../../Cards/UserPCard';
import { useAppContext } from '../../../../Context/userAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

function UserPost() {
    const { rbUserPosts } = useAppContext();
    const [bookForEdit, setBookForEdit] = useState();
    const navigator = useNavigate();

    const handleEdit = async (bookId) => {
        try {
            const book = await axios.get(`http://localhost:3500/api/books/readThisBook${bookId}`);
            setBookForEdit(book.data.book);
            if(book.status === 200) {
                navigator("/bookEditorPage");
            } 
        } catch (error) {
            console.log("There is some errors in your handle edit section so plz fix the bug first ", error);
        }
    };
    if(bookForEdit) {
        localStorage.setItem("AUTHOR_BOOK", JSON.stringify(bookForEdit));    
    }
    const handleDelete = (bookId) => {
         
    };

    return (
        <div className='cartContainer'>
            {/* <h1>Your Books</h1> */}
            <div className='booksList'>
                {rbUserPosts.map(book => (
                    <UserPCard 
                        key={book._id} 
                        book={book} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                    />
                ))}
            </div>
        </div>
    );
}

export default UserPost;
