// TheMovieDB

const apiKey = 'api_key=2f8da33e128ebdd160d821befd533b56'
const baseUrl = 'https://api.themoviedb.org/3'
const queryUrl = baseUrl + '/discover/movie?sort_by=popularity.desc&' + apiKey
const imgUrl = 'https://image.tmdb.org/t/p/w500'
const searchUrl = baseUrl + '/search/movie?' + apiKey

console.log(queryUrl)

// define DOM elements
const form = document.getElementById('form')
const main = document.getElementById('movie-list')
const search = document.getElementById('search')

// page navigation elements
const prevMovie = document.getElementById('prev')
const nextMovie = document.getElementById('next')
const currentMovie = document.getElementById('current')

// define page elements startPoint
let prevPage = 3
let currentPage = 1
let nextPage = 2
let finalUrl = ''
let totalPages = 100

// GET MOVIES FROM API
fetchMovies(queryUrl)
// fetch movies from api
function fetchMovies(url) {
  finalUrl = url
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results)

      if (data.results.length !== 0) {
        displayMovies(data.results)
        currentPage = data.page
        nextPage = currentPage + 1
        prevPage = currentPage - 1
        totalPages = data.total_pages

        currentMovie.innerHTML = currentPage
      }
    })
}

// INSERT MOVIES FETCHED INTO DOM
function displayMovies(data) {
  main.innerHTML = ''

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie
    const movieDetail = document.createElement('div')
    movieDetail.classList.add('movie')
    movieDetail.innerHTML = `
   <img src="${
     poster_path ? imgUrl + poster_path : 'http://via.placeholder.com/1080x1580'
   }" alt="${title}">

   <div class="movie-info">
    <h3>${title}</h3>
    <span class="${get_vote_count(vote_average)}">${vote_average}</span>
   </div>

   <div class="overview">

   <h3>Overview</h3>
   ${overview}
   </br>
   <button class"movie_modal" id="${id}">Info</button>
   </div>
  
   `

    main.appendChild(movieDetail)

    // document.getElementById('id').addEventListener('click', () => {
    //   console.log(id)
    // })
  })
}

// get Vote count function
function get_vote_count(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}
