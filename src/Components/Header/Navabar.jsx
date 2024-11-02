import React, {useState } from 'react'
import "./Navabar.css"
import {Link} from "react-router-dom"

function Navabar() {
  

  return (
    <header>
      <nav>
        <div>
            <Link to="/"><h1>REDBOOK</h1></Link>
            <Link to="/mainSection"><h1>MENU</h1></Link>
        </div>
        <div>
            <Link to={"logIn"}><h1>ACCOUNT</h1></Link>
        </div>
      </nav>
    </header>
  )
}

export default Navabar
