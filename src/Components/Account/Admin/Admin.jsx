import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { useNavigate } from "react-router";

function Admin() {
  // const [acFunc, setAcFunc] = useState(false);
  const navigate = useNavigate();
  const [forAdmin, setForAdmin] = useState(false);
  const [redBookUser, setRedBookUser] = useState(
    JSON.parse(localStorage.getItem("REDBOOK_User")) || ""
  );

  // POP UP STATES ::
  const [logoutPopUp, setLogOutPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [editAcPopUp, setEditAcPopUp] = useState(false);
  const [adminLoginPopUp, setAdminPopUp] = useState(false);

  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(redBookUser && redBookUser.fullName);
  const [username, setUsername] = useState(redBookUser && redBookUser.username);
  const [email, setEmail] = useState(redBookUser && redBookUser.email);
  const [phone, setPhone] = useState(redBookUser && redBookUser.phone);
  const [userProfileImg, setUserProfileImg] = useState();
  const [imageSrc, setImageSrc] = useState(
    redBookUser && redBookUser.userProfileImg
  );
  const [description, setDescription] = useState(
    redBookUser && redBookUser.userDescription
  );


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUserProfileImg(event.target.files[0]);
    console.log(userProfileImg);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const logoutHandler = async () => {
    try {
      const deletedUser = await axios.post(
        `http://localhost:3500/api/user/loggedOutAccount/${redBookUser._id}`,
        {},
        { withCredentials: true }
      );
      console.log(deletedUser);

      if (deletedUser.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.log(
        "There is some errors in your logout handler plz fix the bug ",
        error
      );
    }
  };

  const editAccountHandler = async (e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", fullName);
    data.append("username", username);
    data.append("description", description);
    data.append("userProfileImg", userProfileImg);
    data.append("phone", phone);
    data.append("email", email);
    try { 
      const updatedUser = await axios.put(`http://localhost:3500/api/user/updateAccount/${redBookUser && redBookUser._id}`, 
      data,
      {withCredentials:true}
      );
      if(updatedUser.status === 201) {
        localStorage.setItem("REDBOOK_User", JSON.stringify(updatedUser.data.updatedUser));
        setEditAcPopUp(false);
      }
    } catch (error) {
      console.log("There is some errors in your edit form handler plz fix the bug first ", error);    
    }
  }
  /*const logoutHandler = async (e)=> {
    e.preventDefault();
    try {
       const deletedUser = await axios.post("http://localhost:3500/api/user/loggedOutAccount", {email, password}, {withCredentials:true});
      if(deletedUser.status === 201) {
        localStorage.removeItem("REDBOOK_User");
        navigate("/");
      }
    } catch (error) {
      console.log("There is some errors in your logout handler plz fix the bug first ", error);  
    }
  } */
  return (

    <section className="userPage">

      {/* POP FOR DELETE THE ACCOUNT */}
      {deletePopUp && (
        <div className="logoutPopUp">
          <form onSubmit={logoutHandler}>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Enter your email here.."
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              name="password"
              value={password}
              placeholder="Enter your password here.."
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value={"Logout"} className="btn" />
            <p
              className="goBack"
              onClick={() => setDeletePopUp((prev) => !prev)}
            >
              <b>X</b>
            </p>
          </form>
        </div>
      )}

      {/* POP UP FOR LOG OUT ACCOUNT */}
      {logoutPopUp && (
        <div className="logout2PpUp">
          <div>
            <p>
              "Are you sure you want to log out? Logging out will end your
              current session, and any unsaved changes may be lost. To continue
              using all features and keep your data secure, make sure to save
              your work before logging out. You’ll need to log in again to
              access your account and resume your activity."
            </p>
            <button className="btn" onClick={logoutHandler}>
              Logout
            </button>
            <button onClick={() => setLogOutPopUp(false)}>Cancel</button>
          </div>
        </div>
      )}
      {editAcPopUp && (
        <div className="editAcPopUp">
          <form onSubmit={editAccountHandler} encType="multipart/form-data">
            <div className="img">
              <div>
                {imageSrc ? (
                  <img src={imageSrc} alt="Selected"/>
                ) : (
                  <p>No image</p>
                )}
              </div>
              <label htmlFor="imgTag">Upload Image:</label>
              <input type="file" id="imgTag" onChange={handleImageChange} />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Update your new name here.."
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              name="username"
              placeholder="Update your new username here.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              name="description"
              placeholder="Update your description here.."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              name="phone"
              placeholder="Update your new phone here.."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              name="email"
              placeholder="Update your new email here.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" className="submit" value={"Submit"}/>
            {/* <button className="submit">Submit</button> */}
            <button
              className="cancel"
              onClick={() => setEditAcPopUp((prev) => !prev)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* POP UP FOR ADMIN ACCOUNT CREATION */}

      {/* <div className="adminAcPopUp">
        <form>
          <input type="text" name="email" placeholder="Enter your email here.."/>
          <input type="text" name="email" placeholder="Enter your email here.."/>
          <input type="text" name="email" placeholder="Enter your email here.."/>
          <input type="text" name="email" placeholder="Enter your email here.."/>
          <input type="text" name="email" placeholder="Enter your email here.."/>
        </form>
      </div> */}
      {/* --------------------- */}
      <div className="sidePage">
        <div className="s1">
          {forAdmin && (
            <>
              <p className="mainPara">Admin</p>
              <p className="normalPara">Add New Book</p>
              <p className="normalPara">Create Coupon</p>
            </>
          )}

          <p className="mainPara">Account</p>
          <>
            <p
              className="normalPara"
              onClick={() => setEditAcPopUp((prev) => !prev)}
            >
              Edit Account
            </p>{" "}
            <p className="normalPara">Share Account</p>
          </>

          <p className="normalPara">ChatBot</p>
          <p className="normalPara">Explore</p>
          <p className="mainPara">Settings</p>
          <p className="normalPara">Change Theme</p>
          <p className="normalPara">Two Factor Privacy</p>
          <p className="normalPara">Change Password</p>
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
              <img src={redBookUser && redBookUser.userProfileImg} alt="" />
            </div>
            <div className="details">
              <h3>{redBookUser && redBookUser.fullName}</h3>
              <p>@{redBookUser && redBookUser.username}</p>
              <p>
                <span>{redBookUser && redBookUser.userDescription}.</span>
              </p>
            </div>
          </div>
          <div className="notifications">
            <p>Notification</p>
            <p
              className="logout"
              onClick={() => setLogOutPopUp((prev) => !prev)}
            >
              Logout
            </p>
          </div>
        </div>

        <div className="body">
          <div className="persnol">
            <div>
              <h2>Followers {redBookUser && redBookUser.followers.length}</h2>
            </div>
            <div>
              <h2>Following {redBookUser && redBookUser.following.length}</h2>
            </div>
            <div>
              <h2>Cart Items {redBookUser && redBookUser.cart.length}</h2>
            </div>
            <div>
              <h2>Wishlist {redBookUser && redBookUser.wishlist.length}</h2>
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
