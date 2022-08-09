import { useState } from 'react'
import { createMovie } from '../../api/movies'
import { useNavigate } from 'react-router-dom'
import MovieForm from '../shared/MovieForm'

const CreateMovie = (props) => {
    console.log('these are the props in createMovie', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [movie, setMovie] = useState({
        title: '',
        description: '',
        length: '',
        wellReceived: false
    })

    const handleChange = (e) => {
        setMovie(prevMovie => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            // this handles the checkbox, changing on to true etc
            if (updatedName === "wellReceived" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "wellReceived" && !e.target.checked) {
                updatedValue = false
            }

            const updatedMovie = {
                [updatedName]: updatedValue
            }
            return {
                ...prevMovie,
                ...updatedMovie
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createMovie(user, movie)
            // if we're successful, navigate to the show page for the new movie
            .then(res => { navigate(`/movies/${res.data.movie._id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Created movie successfully',
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Couldnt create movie',
                    variant: 'danger'
                })
            )
    }

    return (
        <MovieForm 
            movie={movie} 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new movie"
        />
    )
}

export default CreateMovie