const LoggedIn = ({ inessaNyt, klikki }) => (
  <div>
    {inessaNyt} logged in <button onClick={klikki}>logout</button>
  </div>
);

export default LoggedIn;
