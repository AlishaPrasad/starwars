import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import MoviesList from "./components/MoviesList";
import { Outlet, useParams } from "react-router-dom";
import { DefaultMessage } from "./components/DefaultMessage";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  const [searchText, setSearchText] = useState("");
  const [sortField, setSortField] = useState("");
  const { id } = useParams();

  return (
    <ErrorBoundary>
      <Header setSearchText={setSearchText} setSortField={setSortField} />
      <div className="flex h100">
        <MoviesList searchText={searchText} sortField={sortField} />
        {!id && <DefaultMessage />}
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}

export default App;
