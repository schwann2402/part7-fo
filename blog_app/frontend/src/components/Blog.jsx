/* eslint-disable react/prop-types */
import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog, addComment } from "../reducers/blogReducer";
import Button from "react-bootstrap/Button";
import { Link, useMatch } from "react-router-dom";
import useField from "../hooks/useField";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(null);
  const [detailsShown, setDetailsShown] = useState(false);
  const enableDetails = { display: detailsShown ? "none" : "" };
  const disableDetails = { display: detailsShown ? "" : "none" };
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const comment = useField("text");
  console.log(blogs);
  const match = useMatch("/blogs/:id");
  const detailGetter = async (id) => {
    const details = await blogService.getBlogDetails(id);
    setShowDetails(details);
    setDetailsShown(!detailsShown);
  };
  if (match) {
    blog = blogs.find((blog) => blog.id === match.params.id);
    console.log(blog);
  }
  const hideDetails = () => {
    setShowDetails(null);
    setDetailsShown(!detailsShown);
  };

  const handleLike = async (id) => {
    const blogData = {
      name: showDetails.name,
      author: showDetails.author,
      url: showDetails.url,
      likes: showDetails.likes + 1,
    };
    dispatch(likeBlog(id, blogData));
    setShowDetails(blogData);
  };

  const handleBlogDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}`)) {
      dispatch(deleteBlog(id));
    }
  };

  const handleComment = async (id) => {
    console.log("Handle comment id: ", id);
    const blogData = {
      comment: comment.value,
    };
    dispatch(addComment(id, blogData));
    setShowDetails(blogData);
  };

  return (
    <div>
      <div id="blog-container">
        <Link to={`../blogs/${blog.id}`}>{blog.title}</Link>
        {showDetails || match ? (
          <>
            <div>
              <b>Author: </b>
              {blog.author ?? showDetails.author}
            </div>
            <div className="dtl-url">
              <b>URL: </b>
              {blog.url ?? showDetails.url}
            </div>
            <div className="dtl-like">
              <b>Likes: </b>
              {blog.likes ?? showDetails.likes}{" "}
              <Button variant="success" onClick={() => handleLike(blog.id)}>
                Like
              </Button>
              {blog.user.id ||
              blog.user ===
                JSON.parse(window.localStorage.getItem("loggedUser")).id ? (
                <Button
                  variant="danger"
                  onClick={() => handleBlogDelete(blog.id)}
                >
                  Delete
                </Button>
              ) : (
                ""
              )}
              <h4>Comments</h4>
              <input {...comment}></input>
              <button onClick={() => handleComment(blog.id)}>
                Add comment
              </button>
              {blog.comments &&
                blog.comments.map((comment) => <div>{comment}</div>)}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Blog;
