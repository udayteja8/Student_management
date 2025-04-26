import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Navbar() {
  return (

    <div>   
      
    
        
      <nav class="navbar navbar-expand-lg navbar-light bg-light mx-3 my-6">
  <div class="container-fluid">
    <a class="navbar-brand" id="na" href="#"><b>Student Management</b></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="nav justify-content-end mx-3">
  <li class="nav-item mx-3">
    <Link class="nav-link active" aria-current="page" to="/Home">Home</Link>
  </li>
  <li class="nav-item mx-3">
    <Link class="nav-link" to="/Add">Add Student</Link>
  </li>
  <li class="nav-item mx-3">
    <Link class="nav-link" to="/Edit">Students List</Link>
  </li>
  
</ul>

    
  </div>
</nav>
    </div>
  )
}
