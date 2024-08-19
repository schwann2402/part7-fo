import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import useField from "../hooks/useField.js";

const BlogForm = () => {
  const dispatch = useDispatch();

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleNewBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      author: author.value,
      title: title.value,
      url: url.value,
    };
    dispatch(createBlog(newBlog));
  };
  return (
    <div className="container">
      <form onSubmit={handleNewBlog}>
        <div>
          Title <input {...title} />
        </div>
        <div>
          Author <input {...author} />
        </div>
        <div>
          Url <input {...url} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
