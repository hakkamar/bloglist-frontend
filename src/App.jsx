import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import LoggedIn from "./components/LoggedIn";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";

import loginService from "./services/login";
import blogService from "./services/blogs";

import "../index.css";

let errori = false;

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [messuMessage, setMessuMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  function nollaaLoginFormi() {
    setUsername("");
    setPassword("");
  }

  function venttaaJaNollaaNotifikaatio() {
    setTimeout(() => {
      setMessuMessage(null);
      errori = false;
    }, 5000);
  }

  const logOut = (event) => {
    event.preventDefault();

    setMessuMessage(`Bye, bye ${user.name}...`);
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    venttaaJaNollaaNotifikaatio();
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      //setBlogs(blogs.concat(returnedBlog));
      blogService.getAll().then((blogs) => setBlogs(blogs));
      setMessuMessage(`a new blog ${blogObject.title} by ${blogObject.author}`);
    });
    venttaaJaNollaaNotifikaatio();
  };

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject.id, blogObject)
      .then((returnedBlog) => {
        setBlogs(
          blogs.map((blog) => (blog.id !== blogObject.id ? blog : blogObject))
        );
        setMessuMessage(`a blog ${blogObject.title} liked`);
      })
      .catch((error) => {
        errori = true;
        setMessuMessage(
          `Blog '${blogObject.title}' was already removed from server`
        );
        // puppua olemassa, joten haetaan blogit uusiksi
        blogService.getAll().then((blogs) => setBlogs(blogs));
      });
    venttaaJaNollaaNotifikaatio();
  };

  const deleteBlog = (poistettavaBlogObject) => {
    blogService
      .poista(poistettavaBlogObject.id)
      .then(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
        setMessuMessage(`a blog ${poistettavaBlogObject.title} removed`);
      })
      .catch(() => {
        //.catch((error) => {
        //console.log("error", error);
        errori = true;
        setMessuMessage(
          `Blog '${poistettavaBlogObject.title}' was already removed from server`
        );
        // puppua olemassa, joten haetaan blogit uusiksi
        blogService.getAll().then((blogs) => setBlogs(blogs));
      });
    venttaaJaNollaaNotifikaatio();
  };
  /*
  const addBlog = (event) => {
    event.preventDefault();

    if (!newTitle || !newAuthor || !newUrl) {
      errori = true;
      setMessuMessage(`a new blog needs Title, Author and URL. Try again.`);
    } else {
      try {
        const newBlogObject = {
          title: newTitle,
          author: newAuthor,
          url: newUrl,
          likes: 0,
        };

        blogService.create(newBlogObject).then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog));
          setMessuMessage(
            `a new blog ${newBlogObject.title} by ${newBlogObject.author}`
          );
          nollaaNewFormi();
        });
      } catch (error) {
        errori = true;
        setMessuMessage(`Adding '${newBlogObject.title}' fails...`);
      }
    }
    venttaaJaNollaaNotifikaatio();
  };
*/

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setMessuMessage(`Wellcome ${user.name}`);
      nollaaLoginFormi();
    } catch (exception) {
      errori = true;
      setMessuMessage(exception.response.data.error);
    }
    venttaaJaNollaaNotifikaatio();
  };

  const sortatutBlogit = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={messuMessage} errori={errori} />

      {!user && (
        <LoginForm
          onSubmit={handleLogin}
          valueUser={username}
          onChangeUser={({ target }) => setUsername(target.value)}
          valuePass={password}
          onChangePass={({ target }) => setPassword(target.value)}
        />
      )}
      {user && (
        <div>
          <LoggedIn inessaNyt={user.name} klikki={logOut} />
          {blogForm()}
          <br></br>
          <div>
            {sortatutBlogit.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                updatedBlogObject={updateBlog}
                poistettavaBlogObject={deleteBlog}
              />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
