import React from "react";
import "./MainSection.css";
function MainSection() {
  return (
    <section className="mainSection">

      <div className="filter">
       <div><h1>REDBOOK</h1></div> 

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
          <select>
            <option value="">All</option>
            <option value="">Horror</option>
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

        <div class="price-filter">
          <label for="priceRange">Filter by Price:</label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="1000"
            value="500"
            step="50"
            oninput="updatePrice(this.value)"
          />
          <div class="range-output">Price: $0 - $500</div>
        </div>

        
        <div className="filterByName">
          <input type="text" placeholder="Search your book" />
        </div>
    <div className="book-filter">
    <label>Filter by Book Type:</label><br/>
    <input type="radio" name="bookType" value="all" onclick="filterBooks()" /> All Books<br/>
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
