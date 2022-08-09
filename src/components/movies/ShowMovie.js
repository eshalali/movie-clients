import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneMovie, updateMovie, removeMovie } from '../../api/movies'
import messages from '../shared/AutoDismissAlert/messages'
import EditMovieModal from './EditMovieModal'

const ShowMovie = (props) => {
    const [movie, setMovie] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    const { user, msgAlert } = props

    console.log('user in props', user)
    console.log('the movie in showMovie', movie)

    useEffect(() => {
        getOneMovie(id)
            .then(res => setMovie(res.data.movie))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting movie',
                    message: messages.getMovieFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    const removeTheMovie = () => {
        removeMovie(user, movie._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Removed movie!',
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing movie',
                    message: 'Couldnt remove movie',
                    variant: 'danger'
                })
            })
    }

    if (!movie) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ movie.title }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Age: { movie.length }</small></div>
                            <div><small>
                                Well Received: { movie.wellReceived ? 'yes' : 'no'}
                            </small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            movie.owner && user && movie.owner === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Movie
                                </Button>
                                <Button onClick={() => removeTheMovie()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Delete
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditMovieModal 
                user={user}
                movie={movie} 
                show={editModalShow} 
                updateMovie={updateMovie}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )

}

export default ShowMovie