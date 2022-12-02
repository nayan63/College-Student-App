import { useCallback, useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap"
import useHttp from "../../Service/use-http";

const ListCollege = () => {
    const [records, setRecords] = useState({});
    const [error, loading, response] = useHttp();

    const getData= useCallback(()=> {
        response('http://localhost:9001/college/list', 'GET', null, getResponse);
    },[]);
    

    useEffect(() => {
        getData();
    },[]);
    const getResponse = (e) => {
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
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>College Name</th>
                        <th>Student Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(records).map((data) => {
                            return (
                                <tr key={data}>
                                    <td>{records[data].id}</td>
                                    <td>{records[data].name}</td>
                                    <td>{records[data].capacity}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ListCollege;