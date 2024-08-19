const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs) return 0;
  const result = blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
  return result;
};

const favoriteBlog = (blogs) => {
  let favoriteBook;
  blogs.forEach((blog) => {
    let max = 0;
    if (blog.likes > max) {
      favoriteBook = blog;
      max = blog.likes;
    }
  });
  return favoriteBook;
};

const mostBlogs = (blogs) => {
  let authors = blogs.map((blog) => blog.author);
  let topAuthor = String(Math.max(...authors));
  blogs = blogs.filter((blog) => blog.author === topAuthor);
  let numberBlogs = blogs.length;
  return {
    author: topAuthor,
    blogs: numberBlogs,
  };
};

const mostLikes = (blogs) => {
  let authors = blogs.map((blog) => blog.author);
  let unique_author_arr = [...new Set(authors)];
  let top_author;
  let likes = 0;
  for (let i = 0; i < unique_author_arr.length; i++) {
    const author_likes = blogs
      .filter((blog) => blog.author === unique_author_arr[i])
      .reduce((acc, curr) => acc + curr.likes, 0);
    if (author_likes > likes) {
      likes = author_likes;
      top_author = unique_author_arr[i];
    }
  }

  return {
    author: top_author,
    likes: likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
