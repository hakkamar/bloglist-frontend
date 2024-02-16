import { useState } from "react";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, user, updatedBlogObject, poistettavaBlogObject }) => {
  const [klikattu, setKlikattu] = useState(null);

  const asetaKlikkaus = () => {
    klikattu !== blog.id ? setKlikattu(blog.id) : setKlikattu("");
  };

  const tykkaaTasta = (blog) => {
    updatedBlogObject({
      author: blog.author,
      user: blog.user,
      id: blog.id,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
    });
  };

  const poistetaankoTama = (blog) => {
    const ok = window.confirm(`Remove blog '${blog.title}'?`);
    if (ok) {
      poistettavaBlogObject({
        id: blog.id,
        title: blog.title,
      });
    }
  };

  let samaUseri = false;
  if (user) {
    samaUseri = user.name === blog.user.name;
  }

  if (blog.id === klikattu) {
    return (
      <div style={blogStyle}>
        <div>
          <b>
            {blog.title} by {blog.author} {""}
          </b>
          <button onClick={() => asetaKlikkaus()}>hide</button>
        </div>
        {blog.url}
        <br></br>
        <div>
          likes: {blog.likes}{" "}
          <button name="like" type="button" onClick={() => tykkaaTasta(blog)}>
            Like
          </button>
        </div>
        <br></br>
        Added by {blog.user.name}
        <br></br>
        {samaUseri && (
          <div>
            <button
              name="remove"
              type="button"
              onClick={() => poistetaankoTama(blog)}
            >
              Remove blog
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <div onClick={() => asetaKlikkaus()}>
          <b>
            {blog.title} by {blog.author} {""}
          </b>
          <button onClick={() => asetaKlikkaus()}>view</button>
        </div>
      </div>
    );
  }
};

export default Blog;
