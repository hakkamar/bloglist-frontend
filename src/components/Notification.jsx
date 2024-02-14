const Notification = ({ message, errori }) => {
  if (message === null) {
    return null;
  }
  // index.css:ssä on errorille ja messulle eri värit (pun ja vih)
  const luokanNimi = errori ? "error" : "messu";

  return <div className={luokanNimi}> {message}</div>;
};

export default Notification;
