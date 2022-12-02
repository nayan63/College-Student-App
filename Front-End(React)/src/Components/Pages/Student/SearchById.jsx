import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap"
import useHttp from "../../Service/use-http";

const SeacrchById = () => {

    const [id,setId] = useState();
    const [error, loading, response] = useHttp();
    const [records, setRecords] = useState({})

    const inputHandler = () => {

        response('http://localhost:9000/student/' + id, 'GET', null, getStudents);
    }

    const getStudents = useCallback((e) => {
        setRecords(e.data);
    }, [records])

    if (error) {
        return (
            <div className="add-form">
                <div className='col-md-6'>
                    <Alert key={'danger'} variant={'danger'}>
                        Something is wrong
                    </Alert>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="add-form">
                <div className='col-md-6'>
                    <h2>Loading...</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="list-details">
            <Form.Group className='col-md-9'>
                <Form.Label htmlFor="search-id">Search By ID: </Form.Label>
                <input className="form-control"
                    onChange={(e)=>{setId(e.target.value)}}
                    type="number"
                    id="search-id"
                />
                <div className="clearfix"></div>
                <Button 
                    type="button"
                    id="search-id"
                    varient={'success'}
                    onClick={inputHandler}
                >
                    CLICK
                </Button>
            </Form.Group>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Profile Picture</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>College</th>
                        <th>Branch</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{records.id}</td>
                        <td>
                            {records.filename !== null ? <img style={{ width: '50px' }} src={'http://localhost:9000/student/file/' + records.filename} alt={records.filename} /> : ''}
                        </td>
                        <td>{records.name}</td>
                        <td>{records.age}</td>
                        <td>{records.college}</td>
                        <td>{records.branch}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default SeacrchById;