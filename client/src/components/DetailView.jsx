import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./DetailView.css";

function DetailView() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`).then((response) => {
      setPost(response.data);
    });

    axios.get(`http://localhost:5000/comments/${id}`).then((response) => {
      const updatedComments = response.data.map((comment) => ({
        ...comment,
        liked: false,
        disliked: false,
      }));
      setComments(updatedComments);
    });
  }, [id]);

  const getRandomUser = async () => {
    const response = await axios.get("https://randomuser.me/api/");
    const user = response.data.results[0];
    return {
      name: `${user.name.first} ${user.name.last}`,
      profilePicture: user.picture.thumbnail,
    };
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const randomUser = await getRandomUser();
    axios
      .post("http://localhost:5000/comments", {
        postId: id,
        author: randomUser.name,
        content,
        profilePicture: randomUser.profilePicture,
      })
      .then((response) => {
        setComments([
          ...comments,
          { ...response.data, liked: false, disliked: false },
        ]);
        setContent("");
      })
      .catch((error) => {
        console.error("There was an error adding the comment!", error);
      });
  };

  const toggleLike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              liked: !comment.liked,
              disliked: comment.liked ? false : false,
            }
          : comment
      )
    );
  };

  const toggleDislike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              disliked: !comment.disliked,
              liked: comment.disliked ? false : false,
            }
          : comment
      )
    );
  };
  const handleDeleteComment = (commentId) => {
    axios
      .delete(`http://localhost:5000/comments/${commentId}`)
      .then(() => {
        console.log(`Comment with ID: ${commentId} deleted successfully.`);
        setComments(comments.filter((comment) => comment._id !== commentId));
      })
      .catch((error) => {
        console.error(
          "There was an error deleting the comment!",
          error.response?.data || error.message
        );
      });
  };

  return (
    <div className="detail-view-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div className="comments-section">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="comment-content">
              <p className="comment-author">{comment.author}</p>
              <p className="comment-text">{comment.content}</p>
              <div className="comment-icons">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  title="Like"
                  className={comment.liked ? "liked" : ""}
                  onClick={() => toggleLike(comment._id)}
                />
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  title="Dislike"
                  className={comment.disliked ? "disliked" : ""}
                  onClick={() => toggleDislike(comment._id)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  title="Delete"
                  onClick={() => handleDeleteComment(comment._id)}
                />
              </div>
            </div>
          </div>
        ))}

        <form onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
}

export default DetailView;
