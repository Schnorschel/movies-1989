import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Movie from './components/Movie'

const App = () => {
  const [movieData, setMovieData] = useState([])
  const [sortBy, setSortBy] = useState('popularity')
  const [sortOrder, setSortOrder] = useState('desc')
  const [pageInputNumber, setPageInputNumber] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(1)

  // const mySetPageNumber = (page) => {
  //   switch
  // }

  // let totalResults
  // let totalPages

  const getMovieDataFromAPI = async () => {
    // const resp = await axios.get(
    //   'https://api.themoviedb.org/3/discover/movie?primary_release_year=1989&sort_by=popularity.desc&api_key=5a39bf29dd3b617bf0c511dbf50b9b2d'
    // )
    const resp = await axios.get(
      'https://api.themoviedb.org/3/discover/movie?primary_release_year=1989&sort_by=' +
        sortBy +
        '.' +
        sortOrder +
        '&page=' +
        pageNumber +
        '&api_key=5a39bf29dd3b617bf0c511dbf50b9b2d'
    )
    setTotalResults(resp.data.total_results)
    setTotalPages(resp.data.total_pages)
    setMovieData(resp.data.results)

    // setMovieData(resp.data)
    // const tempArray = [...resp.data.results]
    // tempArray.sort(
    //   (a, b) => a.release_date - b.release_date
    // )
    // console.log(tempArray)
    // setMovieData(
    //   tempArray.sort(
    //     (a, b) => moment(a.release_date).unix - moment(b.release_date).unix
    //   )
    // )
  }

  useEffect(() => {
    getMovieDataFromAPI()
  }, [sortBy, sortOrder, pageNumber, totalPages])

  return (
    <>
      <h1>Movies of 1989</h1>
      <p className="sorter">
        Sort by&nbsp;
        <select
          name="sortBy"
          onChange={e => {
            setSortBy(e.target.value)
          }}
        >
          <option value="popularity">Popularity Rating</option>
          <option value="primary_release_date">Release Date</option>
        </select>
        &nbsp;in&nbsp;
        <select
          name="sortOrder"
          onChange={e => {
            setSortOrder(e.target.value)
          }}
        >
          <option value="asc">ascending</option>
          <option value="desc" selected>
            descending
          </option>
        </select>
        &nbsp;order&nbsp;&nbsp;&nbsp;
        <button
          className="previousPage"
          onClick={e => {
            if (pageNumber > 1) {
              setPageInputNumber(parseInt(pageNumber) - 1)
              setPageNumber(parseInt(pageNumber) - 1)
            }
          }}
        >
          &lt;
        </button>
        &nbsp;&nbsp;
        <button
          class="gotoPage"
          onClick={e => {
            if (pageInputNumber < 1 || pageInputNumber > totalPages) {
              setPageInputNumber(pageNumber)
            } else {
              setPageNumber(pageInputNumber)
            }
          }}
        >
          Go to page
        </button>
        <input
          type="text"
          size="4"
          value={pageInputNumber}
          onChange={e => {
            setPageInputNumber(e.target.value)
          }}
        />
        &nbsp;of&nbsp;{totalPages}&nbsp;&nbsp;
        <button
          className="nextPage"
          onClick={e => {
            if (pageNumber < totalPages) {
              setPageInputNumber(parseInt(pageNumber) + 1)
              setPageNumber(parseInt(pageNumber) + 1)
            }
          }}
        >
          &gt;
        </button>
      </p>
      <section className="mainContainer">
        <section className="moviesContainer">
          {movieData.map(movie => {
            return (
              <Movie
                key={movie.id}
                popularity={movie.popularity}
                title={movie.title}
                overview={movie.overview}
                imgSrc={movie.poster_path}
                releaseDate={movie.release_date}
              />
            )
          })}
        </section>
      </section>
    </>
  )
}

export default App
