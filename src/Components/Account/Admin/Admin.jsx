import React from "react";
import "./Admin.css";

function Admin() {
  return (
    <section className="userPage">
      <div className="sidePage">
        <div className="s1">
          <p>Account</p>
          <p>ChatBot</p>
          <p>Explore</p>
          <p>Settings</p>
        </div>
        <div className="s2">
          <p className="p">Want to became an admin ?</p>
          <p className="btn">Delete Account</p>
        </div>
      </div>
      <div className="maindiv">
        <div className="nav">
          <div className="user">
            <div className="img">
              <img src="" alt="" />
            </div>
            <div className="details">
              <h3>User Full Name</h3>
              <p>@username</p>
              <p>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  maiores quidem dignissimos fugiat ratione, nesciunt
                  aspernatur, et amet, repellat ab pariatur! Veritatis illum,
                  aliquid doloribus dignissimos quisquam eius temporibus cumque?
                </span>
              </p>
            </div>
          </div>
          <div className="notifications">
            <p>Notification</p>
            <p className="logout">Logout</p>
          </div>
        </div>

        <div className="body">
          <div className="persnol">
            <div>
              <h2>Followers 0</h2>
            </div>
            <div>
              <h2>Following 0</h2>
            </div>
            <div>
              <h2>Cart Items 0</h2>
            </div>
            <div>
              <h2>Wishlist 0</h2>
            </div>
          </div>
          <div className="postContainer">
            <div className="card">
              <h1>Hello</h1>
            </div>
            <div className="card">
              <h1>Hello</h1>
            </div>
            <div className="card">
              <h1>Hello</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
