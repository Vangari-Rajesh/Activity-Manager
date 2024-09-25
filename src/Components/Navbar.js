import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Activity Bar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Activity">Activities</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/New">New Activity</Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item me-2">
            <Link className="nav-link" to="/Progress-1">Analysis</Link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Progress
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="/Progress-3">Bar Graph</a>
              </li>
              <li><a class="dropdown-item" href="/Progress-2">Pie Chart</a></li>
          </ul>
        </li>
        </ul>
      </div>
      <style>
        {`
          .navbar-nav .nav-item .nav-link:hover {
            color: #007bff; /* Change the color to your desired hover color */
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
