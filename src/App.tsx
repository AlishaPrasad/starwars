import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import MoviesList from "./components/MoviesList";
import { Outlet } from "react-router-dom";

function App() {
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("");

  return (
    <>
      <Header setSearchText={setSearchText} setSortField={setSortField} />
      <div className="flex h100">
        <MoviesList searchText={searchText} sortField={sortField} />
        <Outlet />
      </div>
    </>
  );
}

export default App;
