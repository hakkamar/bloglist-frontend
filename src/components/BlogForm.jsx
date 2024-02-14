const BlogForm = ({
  onSubmit,
  valueT,
  onChangeT,
  valueA,
  onChangeA,
  valueU,
  onChangeU,
}) => (
  <form onSubmit={onSubmit}>
    <h3>Create new blog</h3>
    <div>
      Title
      <input type="text" value={valueT} name="Title" onChange={onChangeT} />
    </div>
    <div>
      Author
      <input type="text" value={valueA} name="Author" onChange={onChangeA} />
    </div>
    <div>
      URL
      <input type="text" value={valueU} name="Url" onChange={onChangeU} />
    </div>
    <button type="submit">Create</button>
  </form>
);

export default BlogForm;
