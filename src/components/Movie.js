import React from 'react'
import moment from 'moment'

const Movie = props => {
  const imgPath = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/'
  return (
    <section className="movieContainer">
      <img align="left" src={imgPath + props.imgSrc} alt={props.title} />
      <h2>{props.title}</h2>
      <p>Popularity: {props.popularity.toFixed(1)}</p>
      <p>Release Date: {moment(props.releaseDate).format('Do MMM YY')}</p>
      <p>{props.overview}</p>
    </section>
  )
}

export default Movie
