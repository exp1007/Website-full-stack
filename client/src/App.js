import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [dbData, setRemoteData] = React.useState(null);

  React.useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  React.useEffect(() => {
    fetch("/test/db")
      .then((res) => res.json())
      .then((data) => setRemoteData(data));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <p>{!dbData ? "Loading..." : dbData}</p>
      </header>
    </div>
  );
}

export default App;