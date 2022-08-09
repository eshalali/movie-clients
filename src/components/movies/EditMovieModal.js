import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MovieForm from '../shared/MovieForm'

const EditMovieModal = (props) => {
    const { user, show, handleClose, updateMovie, msgAlert,triggerRefresh } = props

    const [movie, setMovie] = useState(props.movie)

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

        updateMovie(user, movie)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Movie updated',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Couldnt update movie',
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MovieForm 
                    movie={movie}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Movie"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditMovieModal