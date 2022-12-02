import { useCallback, useEffect, useState } from "react";
import { Alert, Form, Table } from "react-bootstrap"
import useHttp from "../../Service/use-http";

const SeacrchByCollege = () => {
    const [colleges, setColleges] = useState({});
    const [error, loading, response] = useHttp();
    const [records, setRecords] = useState({})

    const getData = useCallback(() => {
        response('http://localhost:9001/college/list', 'GET', null, getResponse);
    }, []);

    useEffect(() => {
        getData();
    }, []);
    const getResponse = (e) => {
        setColleges(e.data);
    }

    const selectHandler = (e) => {
        let id = e.target.value;

        response('http://localhost:9000/student/getByCollege/'+id, 'GET', null, getStudents);
    }

    const getStudents=(e)=>{
        setRecords(e.data);
    }
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
            <Form.Select onChange={selectHandler}>
                <option>Open this select menu</option>
                {
                    Object.keys(colleges).map((clg) => {
                        return (
                            <option value={colleges[clg].id} key={clg}>{colleges[clg].name}</option>
                        )
                    })
                }

            </Form.Select>
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
                    {
                        Object.keys(records).map((data) => {
                            return (
                                <tr key={data}>
                                    <td>{records[data].id}</td>
                                    <td>
                                        {records[data].filename !== null ? <img style={{ width: '50px' }} src={'http://localhost:9000/student/file/' + records[data].filename} alt={records[data].filename} /> : ''}
                                    </td>
                                    <td>{records[data].name}</td>
                                    <td>{records[data].age}</td>
                                    <td>{records[data].college}</td>
                                    <td>{records[data].branch}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default SeacrchByCollege;