import React from "react";

function Home() {
    const [data, setData] = React.useState(null);
    const [dbData, setDatabaseData] = React.useState(null);

  React.useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  React.useEffect(() => {
    fetch("/test/db")
      .then((res) => res.json())
      .then((data) => setDatabaseData(data));
  }, []);

  return (
    <div>
        <p>{!data ? "Loading..." : data}</p>
        <p>{!dbData ? "Loading..." : dbData}</p>
    </div>
  );
}

export default Home;