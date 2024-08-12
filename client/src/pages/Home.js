import React from "react";

function Home() {
  const [listOfPosts, setListOfPosts] = React.useState([]);

  React.useEffect(() => {
    fetch("/posts")
      .then((res) => res.json())
      .then((data) => setListOfPosts(data));
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div className="post">
            <div className="title"> {value.title} </div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;