import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllMovies } from '../../api/movies'
import messages from '../shared/AutoDismissAlert/messages'

// Index, makes request to api to get all movies, then shows them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const MovieIndex = (props) => {
    const [movies, setMovies] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in MoviesIndex', props)

    useEffect(() => {
        console.log(props)
        getAllMovies()
            .then(res => setMovies(res.data.movies))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Pets',
                    message: messages.getMoviesFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If movies haven't been loaded yet, show a loading message
    if (!movies) {
        return <LoadingScreen />
    } else if (movies.length === 0) {
        return <p>No movies yet. Better add some.</p>
    }

    const movieCards = movies.map(movie => (
        <Card style={{ width: '30%', margin: 5}} key={ movie._id }>
            <Card.Header>{ movie.title }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/movies/${movie._id}`}>View { movie.title }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { movieCards }
        </div>
    )
}

export default MovieIndex