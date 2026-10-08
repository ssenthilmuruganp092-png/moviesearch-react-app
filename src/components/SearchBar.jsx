function SearchBar({search,setSearch,fetchMovies}){

return(

<div className="search-box">

<input

type="text"

placeholder="Search Movie"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

<button onClick={fetchMovies}>

Search

</button>

</div>

)

}

export default SearchBar;