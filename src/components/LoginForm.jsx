const LoginForm = ({
  onSubmit,
  valueUser,
  onChangeUser,
  valuePass,
  onChangePass,
}) => (
  <form onSubmit={onSubmit}>
    <h3>Log in to application</h3>
    <div>
      username
      <input
        type="text"
        value={valueUser}
        name="Username"
        onChange={onChangeUser}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={valuePass}
        name="Password"
        onChange={onChangePass}
      />
    </div>
    <button type="submit">login</button>
  </form>
);

export default LoginForm;
