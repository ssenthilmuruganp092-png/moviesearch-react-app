function MovieCard({movie}){

return(

<div className="card">

<img

src={
movie.Poster!=="N/A"
?movie.Poster
:"https://via.placeholder.com/300x450"
}

alt={movie.Title}

/>

<h2>{movie.Title}</h2>

<p>

<b>Year:</b> {movie.Year}

</p>

<p>

<b>IMDb:</b> ⭐ {movie.imdbRating}

</p>

<p>

<b>Genre:</b> {movie.Genre}

</p>

<p>

<b>Language:</b> {movie.Language}

</p>

<p>

<b>Plot:</b>

{movie.Plot}

</p>

</div>

)

}

export default MovieCard;