const searchInput= document.getElementById('search-input');
const searchButton= document.getElementById('search-button');
const searchResults= document.getElementById('search-results');
const movieModal= document.querySelector('.movie-modal');

const apiKey= 'YOUR_API_KEY';
const apiUrl= 'https://www.omdbapi.com/';

async function searchMovie(){
    const movieName= searchInput.value.trim();
    if (movieName===''){
        return;
    }

    searchResults.innerHTML = "<h2>Loading...</h2>";

    const url= `${apiUrl}?apikey=${apiKey}&s=${movieName}`;

    try{
        const response= await fetch(url);
        const data= await response.json();
        if(data.Response==='True'){
            displayMovie(data.Search);
        }else{
            searchResults.innerHTML=`<h2> ${data.Error} </h2>`;
        }
        console.log(data);
    }
    catch(error){
        console.log(error);
        searchResults.innerHTML = "<h2>Something went wrong. Please try again.</h2>";
    }
}

function displayMovie(movies){
    searchResults.innerHTML='';   // will remove old titles when searching for new movies

    console.log(movies);

    movies.forEach(function(movie){
        console.log(movie);

        const movieCard= document.createElement('div');
        movieCard.classList.add("movie-card");

        const movieImage = document.createElement('img');
        if (movie.Poster!=='N/A'){
            movieImage.src= movie.Poster;
        }
        else{
            movieImage.remove();  
        }

        const movieInfo = document.createElement('div');
        movieInfo.classList.add("movie-info");

        const movieTitle= document.createElement('h3');
        movieTitle.textContent= movie.Title;

        const movieYear= document.createElement('p');
        movieYear.textContent= movie.Year;

        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieYear);

        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieInfo);

        searchResults.appendChild(movieCard);

        console.log(movie.Poster);
    })
}

searchButton.addEventListener('click',function(){
    searchMovie();
});

searchInput.addEventListener('keydown',function(e){
    if(e.key==='Enter'){
        searchMovie();
    }
});
