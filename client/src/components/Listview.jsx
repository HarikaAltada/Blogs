import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "./ConfirmModal"; // Import the modal component
import "./Listview.css";
import Footer from "./Footer";
function ListView() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [postToDelete, setPostToDelete] = useState(null); // Track the post to be deleted
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Toggle modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setShowConfirmModal(true); // Show the confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postToDelete}`);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postToDelete)
      );
    } catch (err) {
      // Enhanced error logging
      console.error("Failed to delete post:", {
        message: err.message,
        response: err.response ? err.response.data : "No response data",
        status: err.response ? err.response.status : "No status code",
      });
    } finally {
      setShowConfirmModal(false); // Close the modal after deletion
      setPostToDelete(null); // Reset the post to delete
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false); // Close the modal if cancel is clicked
    setPostToDelete(null); // Reset the post to delete
  };

  const editPost = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filter posts based on the search query

  return (
    <>
      <div className="blog-header">
        <h1>Why should I use Flashcards for revision?</h1>
        <img
          src="./icons/toy-bricks-table-with-word-blog.jpg"
          alt="blogs"
          className="logo"
        />
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search and hit enter"
            value={searchQuery} // Bind the search query state to the input
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      <div className="list-view-container">
        <ul>
          {filteredPosts.map((post) => (
            <li key={post._id}>
              <div className="post-header">
                <h2>{post.title}</h2>
                <div className="post-actions">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-icon"
                    onClick={() => editPost(post._id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => handleDeleteClick(post._id)}
                  />
                </div>
              </div>
              <p className="excerpt">{post.excerpt}</p>
              <Link to={`/posts/${post._id}`} className="read-more">
                Read more
              </Link>
            </li>
          ))}
        </ul>

        {/* Show confirmation modal */}
        {showConfirmModal && (
          <ConfirmModal
            message="Are you sure you want to delete this post?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>{" "}
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default ListView;
