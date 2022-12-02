import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useHttp from '../../Service/use-http';

const AddCollege = () => {
    const [resp, setResp] = useState(null);
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [error, loading, response] = useHttp();
    const [popup, setPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { name, capacity };

        response('http://localhost:9001/college/add', 'POST', data, getResponse);

        e.target.reset();
    }
    const getResponse = (e) => {
        setResp(e.data);
        setPopup(true);

        setInterval(() => {
            setPopup(false);
        }, 3000);
    }

    if (error) {
        console.log(error)
        return (
            <div className="add-form">
                <h3>Add College Details</h3>
                <div className='col-md-6'>
                    <Alert key={'danger'} variant={'danger'}>
                        Something is wrong
                    </Alert>
                </div>
            </div>
        )
    }

    if (loading) {
        console.log(loading)
        return (
            <div className="add-form">
                <h3>Add College Details</h3>
                <div className='col-md-6'>
                    <h2>Loading...</h2>
                </div>
            </div>
        )
    }

    if (popup) {
        return (
            <div className="add-form">
                <h3>Add College Details</h3>
                <div className='col-md-6'>
                    <Alert key={'success'} variant={'success'}>
                        {resp}
                    </Alert>
                </div>
            </div>
        )
    }

    return (
        <div className="add-form">
            <h3>Add College Details</h3>
            <div className='col-md-6'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>College Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='name'
                            placeholder="Enter College Name"
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Student Capacity</Form.Label>
                        <Form.Control
                            type="number"
                            name='capacity'
                            placeholder="Student Capacity"
                            onChange={(e) => { setCapacity(e.target.value) }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default AddCollege;