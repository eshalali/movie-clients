import { Form, Button,Container } from 'react-bootstrap'

const MovieForm = (props) => {
    const { movie, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                    placeholder="What is the title of the movie?"
                    name="title"
                    id="title"
                    value={ movie.title }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    placeholder="Describe the movie"
                    name="description"
                    id="description"
                    value={ movie.description }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="length">Length</Form.Label>
                <Form.Control
                    placeholder="How long is the movie?"
                    name="length"
                    id="length"
                    value={ movie.length }
                    onChange={ handleChange }
                />
                <Form.Check
                    label="Was the movie well-received?"
                    name="wellReceived"
                    defaultChecked={ movie.wellReceived  }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default MovieForm