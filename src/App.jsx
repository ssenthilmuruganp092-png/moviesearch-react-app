import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";

const API_KEY = "54d85ae4";

function App() {
  const [search, setSearch] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    if (search.trim() === "") {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Search movies
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );

      const data = await response.json();
      console.log(data);

      if (data.Response === "True") {
        // Get complete details for each movie
        const details = await Promise.all(
          data.Search.map(async (movie) => {
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`
            );
            return await res.json();
          })
        );

        setMovies(details);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your internet connection.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1>🎬 Movie Search App</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        fetchMovies={fetchMovies}
      />

      {loading && <Loader />}

      {error && <h2>{error}</h2>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;