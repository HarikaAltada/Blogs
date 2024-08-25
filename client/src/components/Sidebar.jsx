import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </li>{" "}
        <li>
          {" "}
          <Link to="/create">
            <img src="./icons/Edit.svg" alt="" />
          </Link>
        </li>
        <li>
          <img src="./icons/book.svg" alt="" />
        </li>
        <li>
          {" "}
          <img src="./icons/book2.svg" alt="" />
        </li>
        <li>
          <img src="./icons/group.svg" alt="" />
        </li>
        <li>
          <img src="./icons/quiz.svg" alt="" />
        </li>
        <li>
          <img src="./icons/accounts.svg" alt="" />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
