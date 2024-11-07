import React, { useEffect, useRef, useState } from "react";
import "./AddNewBook.css";
import FroalaEditor from "froala-editor";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";

function AddNewBook() {
  const editorRef = useRef(null);
  const froalaInstanceRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookName, setBookName] = useState("");
  const [bookTitle, setbBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [ISBN, setISBN] = useState("");
  const [bookCoverImg, setBookCoverImg] = useState("");
  const [price, setPrice] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [samplePages, setSamplePages] = useState("");
  const [savedBook, setSavedBook] = useState([]);

  const [localSaveBook, setLocalSaveBook] = useState();

  const initializeEditor = () => {
    if (editorRef.current && !froalaInstanceRef.current) {
      froalaInstanceRef.current = new FroalaEditor(editorRef.current, {
        toolbarButtons: [
          "bold",
          "italic",
          "underline",
          "insertImage",
          "insertFile",
          "undo",
          "redo",
        ],
        imageUpload: true,
        fileUpload: true,
        events: {
          contentChanged: () => {
            console.log("Content updated");
          },
        },
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookCoverImg(reader.result); // Set the base64 image data
      };
      reader.readAsDataURL(file);
    }
  };
  //   useEffect(() => {
  //     // Save to local storage whenever `savedBook` updates
  //     localStorage.setItem("savedBook", JSON.stringify(savedBook));
  // }, [savedBook]);

  const handleSavePage = () => {
    if (froalaInstanceRef.current) {
      const rawHTML = froalaInstanceRef.current.html.get();
      const textContent = rawHTML
        .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
        .replace(/&nbsp;/g, " "); // Replace &nbsp; with a regular space

      const images = Array.from(editorRef.current.querySelectorAll("img")).map(
        (img) => img.src
      );
      const files = Array.from(editorRef.current.querySelectorAll("a")).map(
        (link) => link.href
      );

      const page = {
        pageNumber: currentPage,
        content: textContent,
        images,
        files,
      };

      setPages((prevPages) => [...prevPages, page]);

      setSavedBook((prev) => {
        const updatedSavedBook = {
          bookName,
          bookTitle,
          description,
          author,
          ISBN,
          isFree,
          categories,
          price,
          pages: [...pages, page], // Ensure latest page is included
          bookCoverImg,
          availableCopies,
          samplePages,
          currentPage,
        };

        // Update localStorage synchronously after setting savedBook
        localStorage.setItem("AUTHOR_BOOK", JSON.stringify(updatedSavedBook));

        return updatedSavedBook; // Return updated book data to set state
      });
      /* setSavedBook(prev => {
  const updatedSavedBook = {
    bookName,
    bookTitle,
    description,
    author,
    ISBN,
    isFree,
    categories,
    price,
    pages: [...pages, page], // Ensure latest page is included
    bookCoverImg,
    availableCopies,
    samplePages,
    currentPage
  };
  return updatedSavedBook;
});
 */
      froalaInstanceRef.current.html.set("");
      setCurrentPage(currentPage + 1);
    }
  };
  // console.log(bookName);
  useEffect(() => {
    if (savedBook) {
      // localStorage.setItem("AUTHOR_BOOK", JSON.stringify(savedBook));
      console.log("Book saved:", savedBook);
    }
    if (JSON.parse(localStorage.getItem("AUTHOR_BOOK"))) {
      console.log(JSON.parse(localStorage.getItem("AUTHOR_BOOK")));
    }
  }, [savedBook]);
  // Handle submitting the book
  const handleSubmitBook = (e) => {
    e.preventDefault();
    console.log("Book pages:", pages, bookName, bookTitle, description);
  };
  if (editorRef.current && !froalaInstanceRef.current) {
    initializeEditor();
  }
  console.log("This is locally save book ", localSaveBook);
  useEffect(() => {
    // Retrieve the saved book data from localStorage
    const storedBook = JSON.parse(localStorage.getItem("AUTHOR_BOOK"));
    if (storedBook) {
      setLocalSaveBook(storedBook);
      setBookName(storedBook.bookName || "");
      setbBookTitle(storedBook.bookTitle || "");
      setAuthor(storedBook.author || "");
      setDescription(storedBook.description || "");
      setCategories(storedBook.categories || "");
      setISBN(storedBook.ISBN || "");
      setBookCoverImg(storedBook.bookCoverImg || "");
      setPrice(storedBook.price || "");
      setAvailableCopies(storedBook.availableCopies || "");
      setIsFree(storedBook.isFree || false);
      setSamplePages(storedBook.samplePages || "");
    }
  }, []);

  return (
    <section className="addNewBookSection">
      <div className="formContainer">
        <form onSubmit={handleSubmitBook}>
          <input
            type="text"
            name="bookName"
            placeholder="Enter your book name here.."
            value={
              localSaveBook && localSaveBook.bookName
                ? localSaveBook.bookName
                : bookName
            }
            onChange={(e) => setBookName(e.target.value)}
          />
          <input
            type="text"
            name="bookTitle"
            placeholder="Enter your book title here.."
            value={
              localSaveBook && localSaveBook.bookTitle
                ? localSaveBook.bookTitle
                : bookTitle
            }
            onChange={(e) => setbBookTitle(e.target.value)}
          />
          <input
            type="text"
            name="author"
            placeholder="Enter book author name"
            value={
              localSaveBook && localSaveBook.author
                ? localSaveBook.author
                : author
            }
            onChange={(e) => setAuthor(e.target.value)}
          />
          <textarea
            placeholder="Enter book description here.."
            value={
              localSaveBook && localSaveBook.description
                ? localSaveBook.description
                : description
            }
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            name="genre"
            id="genre"
            value={
              localSaveBook && localSaveBook.categories
                ? localSaveBook.categories
                : categories
            }
            onChange={(e) => setCategories(e.target.value)}
          >
            <option value="comedy">Comedy</option>
            <option value="history">History</option>
            <option value="adventure">Adventure</option>
            <option value="romance">Romance</option>
            <option value="science-fiction">Science Fiction</option>
            <option value="fantasy">Fantasy</option>
            <option value="mystery">Mystery</option>
            <option value="thriller">Thriller</option>
            <option value="horror">Horror</option>
            <option value="biography">Biography</option>
            <option value="self-help">Self-Help</option>
            <option value="educational">Educational</option>
            <option value="others">Others</option>
          </select>
          <input
            type="text"
            id="isbn"
            name="ISBN"
            maxLength="13"
            placeholder="Enter ISBN"
            value={
              localSaveBook && localSaveBook.ISBN ? localSaveBook.ISBN : ISBN
            }
            onChange={(e) => setISBN(e.target.value)}
          />
          <input
            type="number"
            name="availableCopies"
            placeholder="Available Copies"
            value={
              localSaveBook && localSaveBook.availableCopies
                ? localSaveBook.availableCopies
                : availableCopies
            }
            onChange={(e) => setAvailableCopies(e.target.value)}
          />
          <input
            type="number"
            name="samplePages"
            placeholder="Sample Pages"
            value={
              localSaveBook && localSaveBook.samplePages
                ? localSaveBook.samplePages
                : samplePages
            }
            onChange={(e) => setSamplePages(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
            />
            <p>Is this book free?</p>
          </label>
          <label>
            Upload Book Cover:
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter Your Book Price.."
            value={
              localSaveBook && localSaveBook.price ? localSaveBook.price : price
            }
            onChange={(e) => setPrice(e.target.value)}
          />
          {bookCoverImg && (
            <div>
              <h3>Book Cover Preview:</h3>
              <img
                src={bookCoverImg}
                alt="Book Cover"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}

          {/* Froala Editor */}
          <div id="edit" ref={editorRef}></div>

          <button type="button" onClick={handleSavePage}>
            Save Page
          </button>
          <button type="submit">Post Book</button>
        </form>
      </div>
    </section>
  );
}

export default AddNewBook;
