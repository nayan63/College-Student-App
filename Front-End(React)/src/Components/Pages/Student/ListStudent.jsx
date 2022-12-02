import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap"
import useHttp from "../../Service/use-http";

const ListStudent = () => {
    const [records, setRecords] = useState({});
    const [error, loading, response] = useHttp();

    const getData = useCallback(() => {
        response('http://localhost:9000/student/list', 'GET', null, getResponse);
    }, []);

    useEffect(() => {
        getData();
    }, []);
    const getResponse = (e) => {
        setRecords(e.data);
    }

    const deleteHandler =(id)=>{
        response('http://localhost:9000/student/delete/'+id, 'DELETE', null, successDelete);
    }
    const successDelete=()=>{
        getData();
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
                        <th>Profile Picture</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>College</th>
                        <th>Branch</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(records).map((data) => {
                            return (
                                <tr key={data}>
                                    <td>{records[data].id}</td>
                                    <td>
                                        { records[data].filename!==null?<img style={{ width: '50px' }} src={'http://localhost:9000/student/file/' + records[data].filename} alt={records[data].filename} />:''}
                                    </td>
                                    <td>{records[data].name}</td>
                                    <td>{records[data].age}</td>
                                    <td>{records[data].college}</td>
                                    <td>{records[data].branch}</td>
                                    <td>
                                        <Button className="btn btn-warning" >Edit</Button> &nbsp;&nbsp;
                                        <Button 
                                            className="btn btn-danger" 
                                            onClick={(e)=>{deleteHandler(records[data].id)}}
                                            >
                                                Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ListStudent;