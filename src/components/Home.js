import MovieIndex from './movies/MovieIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props
	return (
		<>
			<h2>See Movies</h2>
			<MovieIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
