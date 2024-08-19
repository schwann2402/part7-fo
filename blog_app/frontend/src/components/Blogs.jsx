import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import { useEffect } from "react";
import { blogsGetter } from "../reducers/blogReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogsGetter());
  }, []);
  const blogs = useSelector((state) => state.blogs);
  return (
    <div className="container xs">
      <h1>Blogs</h1>
      {[...blogs].map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

export default Blogs;
