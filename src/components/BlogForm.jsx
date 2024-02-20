import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  function nollaaNewFormi() {
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  }

  const addBlog = (event) => {
    event.preventDefault();

    if (!newTitle || !newAuthor || !newUrl) {
      alert(`a new blog needs Title, Author and URL. Try again.`);
    } else {
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0,
      });

      nollaaNewFormi();
    }
  };

  return (
    <div className="formDiv">
      <h3>Create new blog</h3>

      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            id="title"
            type="text"
            value={newTitle}
            name="Title"
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          Author
          <input
            id="author"
            type="text"
            value={newAuthor}
            name="Author"
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          URL
          <input
            id="url"
            type="text"
            value={newUrl}
            name="Url"
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
