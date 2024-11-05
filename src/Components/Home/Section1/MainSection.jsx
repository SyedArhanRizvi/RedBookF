import React, { useState } from "react";
import "./MainSection.css";
import {Link} from "react-router-dom"
function MainSection() {
  const [rangePrice, setRangePrice] = useState(500);
  return (
    <section className="mainSection">

      <div className="filter">
       <div className="logo"><h1><Link to={"/"}>REDBOOK</Link></h1></div> 

      <div class="sort-filter">
    <form action="/your-api-endpoint" method="GET">
        <label for="sortBy">Sort By:</label>
        <select name="sortBy" id="sortBy">
            <option value="price">Price</option>
            <option value="category">Category</option>
        </select>

        <label for="sort">Order:</label>
        <select name="sort" id="sort">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>

        <button type="submit">Sort</button>
    </form>
</div>

        <div className="filterByCategory">
          <p>Categories</p>
          <select name="category">
            <option value="all">All</option>
            <option value="horror">Horror</option>
            <option value="">Horror</option>
            <option value="">Horror</option>
            <option value="">Horror</option>
            <option value="">Horror</option>
            <option value="">Horror</option>
            <option value="">Horror</option>
            <option value="">Horror</option>
            <option value="">Horror</option>
            <option value="">Horror</option>
          </select>
        </div>

        <div className="price-filter">
      <label htmlFor="priceRange">Filter by Price:</label>
      <input
        type="range"
        id="priceRange"
        min="0"
        max="2000"
        value={rangePrice}
        step="50"
        className="rangeInput"
        onInput={(e) => setRangePrice(e.target.value)}
      />
      <div className="range-output">Price: $0 - ${rangePrice}</div>
    </div>

        
        <div className="filterByName">
          <input type="text" placeholder="Search book or author" />
        </div>
    <div className="book-filter">
    <label>Filter by Book Type:</label><br/>
    <input type="radio" name="bookType" value="all" onclick="filterBooks()" checked/> All Books<br/>
    <input type="radio" name="bookType" value="free" onclick="filterBooks()"/> Free Books<br/>
    <input type="radio" name="bookType" value="paid" onclick="filterBooks()"/> Paid Books
    </div>

    <div class="author-filter">
          <label for="authorSelect">Filter by Author:</label>
          <select id="authorSelect" onchange="filterByAuthor()">
            <option value="all">All Authors</option>
            <option value="author1">Author 1</option>
            <option value="author2">Author 2</option>
            <option value="author3">Author 3</option>
          </select>
        </div>

      </div>
      <div className="prods"></div>
    </section>
  );
}

export default MainSection;
