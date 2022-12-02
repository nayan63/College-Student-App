import { CardGroup } from "react-bootstrap";
import Cards from "./Cards";

const Home = () => {

    return (
        <>
            <CardGroup className="card-grp">
                <Cards image={process.env.PUBLIC_URL + '/assets/images/image (1).jpg'} />
                <Cards image={process.env.PUBLIC_URL + '/assets/images/image (2).jpg'} />
                <Cards image={process.env.PUBLIC_URL + '/assets/images/image (3).jpg'} />
            </CardGroup>
            <CardGroup className="card-grp">
                <Cards image={process.env.PUBLIC_URL + '/assets/images/image (4).jpg'} />
                <Cards image={process.env.PUBLIC_URL + '/assets/images/image (5).jpg'} />
                <Cards image={process.env.PUBLIC_URL + '/assets/images/image (6).jpg'} />
            </CardGroup>
            <CardGroup className="card-grp">
                <Cards image={process.env.PUBLIC_URL + '/assets/images/image (7).jpg'} />
                <Cards image={process.env.PUBLIC_URL + '/assets/images/image (8).jpg'} />
                <Cards image={process.env.PUBLIC_URL + '/assets/images/image (9).jpg'} />
            </CardGroup>
        </>
    )
}

export default Home;