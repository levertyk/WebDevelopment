/* eslint-disable no-undef */

// The number of movies in the database
const MOVIE_COUNT = 557

// Global variables for page information
let curPage = 1
let maxPages = -1

// Runs when the DOM is ready and the document is loaded
$(document).ready(() => {
  // Starting Button Events
  $('#sorting').on('change', reloadMovieData)
  $('#amount').on('change', reloadMovieData)

  // First loading of page
  reloadMovieData()

  // Button Events for the Paginagation
  $('.page-link').on('click', reloadMovieData)
})

// Callback function for the page buttons
function updateCurrentPage (text) {
  // Find returned text
  switch (text) {
    case '&laquo;': curPage--; break
    case '&raquo;': curPage++; break
    default: curPage = parseInt(text)
  }

  if (curPage < 1) { curPage = 1 }
  if (curPage > maxPages) { curPage = maxPages }

  reloadMovieData()
}

// Initiate an AJAX call to retrieve data for the current page
function reloadMovieData () {
  // Get data to be sent to server
  const sortBy = $('#sorting').val()
  const limit = parseInt($('#amount').val())

  // Collect data to send
  const params = {
    orderBy: sortBy,
    offset: (curPage - 1) * limit,
    limit: limit
  }

  // AJAX Request to server
  $.ajax({
    type: 'GET',
    url: 'movieListJSON.php',
    data: params,
    dataType: 'json',
    success: (data) => {
      rebuildMovieGrid(data, limit)
      console.log(data)
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR)
      console.log(JSON.stringify(jqXHR))
      console.log('AJAX error: ' + textStatus + ' : ' + errorThrown)
    }
  })
}

// Clear and rebuild the movie grid (called when movie data is ready)
function rebuildMovieGrid (movieData, limit) {
  $('#movieGrid').empty()

  rebuildPaginator()

  for (let i = 0; i < limit; i++) {
    makeMovieTile(movieData, i)
  }
}

// Make tile for each movie title
function makeMovieTile (movieData, i) {
  const title = movieData[i].title
  const id = movieData[i].id
  const image = movieData[i].image
  const year = movieData[i].year
  const rating = movieData[i].content_rating
  const genres = movieData[i].genres

  $('#movieGrid').append(`
    <div class="col-6 col-sm-6 col-md-4 col-lg-3">
      <div class="card my-2" onclick="requestDetails('` + id + `')">
        <h5 class="card-header text-truncate" style="cursor: pointer;">
          ` + title + `
        </h5>
        <div class="card-body" style="height: 352px;">
          <img class="mx-auto my-0 d-block" alt="` + title + ` poster thumbnail"
            height="250px" src="http://144.13.22.52/myflix3/images/thumbs/` + image + `" />
          <div class="card-text text-muted h6 mt-2">
            ` + year + ', ' + rating + '<br>' + genres + `
          </div>
        </div>
      </div>
    </div>
  `)
}

// Clear and rebuild the paginator buttons
function rebuildPaginator () {
  $('.pagination').empty()

  const prevLI = makePrevNextButton()
  $('.pagination').append(prevLI)

  const perPage = parseInt($('#amount').val())
  let tempPage = 1
  for (let i = 1; i <= MOVIE_COUNT; i += perPage) {
    $('.pagination').append(makePageButton(tempPage))
    tempPage++
  }

  maxPages = tempPage

  const nextLI = makePrevNextButton(false)
  $('.pagination').append(nextLI)
}

// Make buttons for specific pages
function makePrevNextButton (isPrevious = true) {
  const label = isPrevious ? 'previous' : 'next'
  const symbol = isPrevious ? '&laquo;' : '&raquo;'

  const prevNextLI = $('<li>').addClass('page-item')
  const prevNextA = $('<a>').addClass('page-link').attr('href', '#').attr('aria-label', label).attr('onclick', 'updateCurrentPage("' + symbol + '")')
  prevNextA.append('<span>').attr('aria-hidden', 'true').html(symbol)
  prevNextLI.append(prevNextA)
  return prevNextLI
}

// Make buttons for scrolling pages
function makePageButton (page) {
  const pageLI = $('<li>').addClass('page-item')
  const pageA = $('<a>').addClass('page-link').attr('href', '#').text(page).attr('onclick', 'updateCurrentPage(' + page + ')')

  if (page === curPage) {
    pageLI.addClass('active')
  }
  pageLI.append(pageA)
  return pageLI
}

// Initiate an AJAX call to get the details for one movie
function requestDetails (movieID) {
  params = {
    id: movieID
  }

  $.getJSON('movieDetailsJSON.php', params, (data) => {
    detailsReceived(data)
  })
}

// The callback function for when movie DETAILS are received
function detailsReceived (movie) {
  $('#movieTitle').empty()
  $('#moviePoster').empty()
  $('#movieDetailList').empty()
  $('#movieDetails').empty()

  $('#movieTitle').text(movie.title)

  $('#movieDetails').append('<img src="http://144.13.22.52/myflix3/images/posters/' + movie.image + '" alt="movie poster">')
  const detailList = $('#movieDetails').append('<ul></ul>')
  detailList.append('<li><b>Year Released:</b> ' + movie.year + '</li>')
  detailList.append('<li><b>Rated:</b> ' + movie.content_rating + '</li>')
  detailList.append('<li><b>IMDB Rating:</b> ' + movie.imdb_rating + '</li>')
  detailList.append('<li><b>Directed By:</b> ' + movie.directors + '</li>')
  detailList.append('<li><b>Written By:</b> ' + movie.writers + '</li>')
  detailList.append('<li><b>Starring:</b> ' + movie.actors + '</li>')
  detailList.append('<li><b>Genres:</b> ' + movie.genres + '</li>')
  $('#movieDetails').append('<p>' + movie.description + '</p>')

  // Shows the modal (call this last)
  $('#movieModal').modal()
}
