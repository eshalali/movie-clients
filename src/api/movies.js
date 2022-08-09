import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllMovies = () => {
    return axios(`${apiUrl}/movies`)
}

// READ => SHOW
export const getOneMovie = (id) => {
    return axios(`${apiUrl}/movies/${id}`)
}

// CREATE
export const createMovie = (user, newMovie) => {
	return axios({
		url: apiUrl + '/movies',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { movie: newMovie }
	})
}

// UPDATE
export const updateMovie = (user, updatedMovie) => {
    console.log('this is updatedMovie', updatedMovie)
	return axios({
		url: `${apiUrl}/movies/${updatedMovie.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { movie: updatedMovie }
	})
}

// DELETE
export const removeMovie = (user, movieId) => {
    return axios({
		url: `${apiUrl}/movies/${movieId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}