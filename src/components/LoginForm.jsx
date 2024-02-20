import PropTypes from "prop-types";

const LoginForm = ({
  onSubmit,
  valueUser,
  onChangeUser,
  valuePass,
  onChangePass,
}) => (
  <div>
    <h3>Log in to application</h3>

    <form className="Loginformi" onSubmit={onSubmit}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={valueUser}
          name="Username"
          onChange={onChangeUser}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={valuePass}
          name="Password"
          onChange={onChangePass}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeUser: PropTypes.func.isRequired,
  onChangePass: PropTypes.func.isRequired,
  valueUser: PropTypes.string.isRequired,
  valuePass: PropTypes.string.isRequired,
};

export default LoginForm;
