const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author}, likes: {blog.likes}
  </div>
);

export default Blog;
