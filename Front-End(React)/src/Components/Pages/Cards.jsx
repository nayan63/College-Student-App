import { Button, Card } from "react-bootstrap"

const Cards = (props)=>{
    return (
        <Card style={{width: '15rem',
            height: '20rem', margin: '0px 5px 0px 5px' }}>
            <Card.Img className="card-image" variant="top" src={props.image} alt="Image" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text.
                </Card.Text>
                <Button variant="primary">Click</Button>
            </Card.Body>
        </Card>
    )
}

export default Cards;