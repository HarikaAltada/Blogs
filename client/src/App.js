import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListView from "./components/Listview";
import DetailView from "./components/DetailView";
import CreatePost from "./components/Createpost";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EditPost from "./components/EditPost";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<ListView />} />
              <Route path="/posts/:id" element={<DetailView />} />
              <Route path="/create" element={<CreatePost />} />{" "}
              <Route path="/edit-post/:id" element={<EditPost />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
