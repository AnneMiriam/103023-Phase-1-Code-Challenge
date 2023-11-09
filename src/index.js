const url = 'http://localhost:3000/films';
const movPoster = document.getElementById('poster');
const movTitle = document.getElementById('title');
const movRuntime = document.getElementById('runtime');
const movDesc = document.getElementById('film-info');
const movShowtime = document.getElementById('showtime');
const remainTix = document.getElementById('ticket-num');
const buyTix = document.getElementById('buy-ticket');
const jsonResp = resp => resp.json();
const filmList = document.getElementById('films')

// Step 1 - GET the 1st movie's details on the page
fetch(`${url}/1`)
.then(jsonResp)
.then(renderMovieDetails)

function renderMovieDetails(movie) {
    movPoster.src = movie.poster;
    movPoster.alt = movie.title;
    movTitle.textContent = movie.title;
    movRuntime.textContent = `${movie.runtime} minutes`;
    movDesc.textContent = movie.description;
    movShowtime.textContent = movie.showtime;
    remainTix.textContent = movie.capacity - movie.tickets_sold;
    // Step 3 - buy tix until sold out - click event
    buyTix.addEventListener('click', () => {
        let soldTix = parseInt(remainTix.textContent)
        if (soldTix > 0){
            soldTix--;
            remainTix.textContent = soldTix;
        } else {
            alert("SOLD OUT")
        }
    })
}
// Step 2 - GET all movie titles on the L side of screen
fetch(url)
.then(jsonResp)
.then(movies => {
    // JS to remove former li
    filmList.innerHTML = '';
    movies.forEach(movie => renderMovieTitles(movie));
})

function renderMovieTitles(movie) {
    const movList = document.createElement('li');
    movList.textContent = movie.title;
    // optional added .film from css
    movList.classList.add('film')
    filmList.append(movList)
}
