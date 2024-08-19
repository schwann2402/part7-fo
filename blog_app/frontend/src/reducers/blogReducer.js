import { createSlice, current } from "@reduxjs/toolkit";
import BlogService from "../services/blogs";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const blogsGetter = () => {
  return async (dispatch) => {
    const blogs = await BlogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (note) => {
  return async (dispatch) => {
    const newBlog = await BlogService.create(note);
    dispatch(addBlog(newBlog));
  };
};

export const likeBlog = (id, blogToUpdate) => {
  return async (dispatch) => {
    await BlogService.updateBlog(id, blogToUpdate);
    blogsGetter();
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await BlogService.deleteBlog(id);
    const blogs = await BlogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addComment = (id, blogToUpdate) => {
  return async (dispatch) => {
    console.log("Dispatched id from reducer: ", id);
    await BlogService.addComment(id, blogToUpdate);
    const blogs = await BlogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const { setBlogs, addBlog } = blogReducer.actions;
export default blogReducer.reducer;
