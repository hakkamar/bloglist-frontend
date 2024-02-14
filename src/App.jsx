import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import LoggedIn from "./components/LoggedIn";
import BlogForm from "./components/BlogForm";
import Footer from "./components/Footer";

import loginService from "./services/login";
import blogService from "./services/blogs";

import "../index.css";

let errori = false;

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [messuMessage, setMessuMessage] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  function nollaaNewFormi() {
    setNewAuthor("");
    setNewTitle("");
    setNewUrl("");
  }

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
        /*
            setPersons(
              persons.filter((n) => n.name !== nameAndNumberObject.name)
            );
            */
        errori = true;
        setMessuMessage(`Adding '${newBlogObject.title}' fails...`);
      }
    }
    venttaaJaNollaaNotifikaatio();
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    //console.log("logging in with", username, password);
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
      setMessuMessage("wrong credentials");
    }
    venttaaJaNollaaNotifikaatio();
  };

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
          <BlogForm
            onSubmit={addBlog}
            valueT={newTitle}
            onChangeT={({ target }) => setNewTitle(target.value)}
            valueA={newAuthor}
            onChangeA={({ target }) => setNewAuthor(target.value)}
            valueU={newUrl}
            onChangeU={({ target }) => setNewUrl(target.value)}
          />
          <br></br>
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
