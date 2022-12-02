import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import useHttp from '../../Service/use-http';

const EditStudent = () => {
    const [resp, setResp] = useState({});
    const [colleges, setColleges] = useState({});

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [collegeId, setCollegeId] = useState('');
    const [branch, setBranch] = useState('');
    const [file, setFile] = useState('');

    const [preFile,setPreFile] = useState();

    const [preview, setPreview] = useState();

    const [error, loading, response] = useHttp();
    const [popup, setPopup] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        response('http://localhost:9001/college/list', 'GET', null, getCollegeResponse);
        response('http://localhost:9000/student/get-by-id/'+id, 'GET', null, getInitialResponse);
    }, []);
    const getCollegeResponse = (e) => {
        setColleges(e.data);
    }

    const getInitialResponse=(e)=>{
        setName(e.data.name);
        setAge(e.data.age);
        setCollegeId(e.data.college_id);
        setBranch(e.data.branch);
        setPreFile(e.data.filename);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("file", file);
        formData.append("student", new Blob([JSON.stringify({
            "name": name,
            "age": age,
            "college_id": collegeId,
            "branch": branch,
            "filename": preFile
        })], {
            type: "application/json"
        }));

        response('http://localhost:9000/student/edit/'+id, 'PUT', formData, getResponse);

        e.target.reset();
    }
    const getResponse = (e) => {
        setResp(e.data);
        console.log(e.data)
        setPopup(true);

        setInterval(() => {
            setPopup(false);
        }, 3000);
    }

    if (error) {
        return (
            <div className="add-form">
                <h3>Add Student Details</h3>
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
                <h3>Add Student Details</h3>
                <div className='col-md-6'>
                    <h2>Loading...</h2>
                </div>
            </div>
        )
    }

    if (popup) {
        return (
            <div className="add-form">
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
            <h3>Add Student Details</h3>
            <div className='col-md-6'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='name'
                            value = {name}
                            placeholder="Enter Student Name"
                            onChange={(e) => { setName(e.target.value) }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Student Age</Form.Label>
                        <Form.Control
                            type="number"
                            name='age'
                            value={age}
                            placeholder="Student Age"
                            onChange={(e) => { setAge(e.target.value) }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>College</Form.Label>
                        <Form.Select value={collegeId} onChange={(e) => { setCollegeId(e.target.value) }}>
                            <option>Select College</option>
                            {
                                Object.keys(colleges).map((data) => {
                                    return (
                                        <option key={data} value={colleges[data].id}>{colleges[data].name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Branch</Form.Label>
                        <Form.Control
                            type="text"
                            name='branch'
                            value={branch}
                            placeholder="Branch"
                            onChange={(e) => { setBranch(e.target.value) }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            type="file"
                            name='file'
                            onChange={(e) => {
                                const objectUrl = URL.createObjectURL(e.target.files[0]);
                                setPreview(objectUrl)
                                setFile(e.target.files[0])
                            }}
                        />

                        {preFile ? <img src={'http://localhost:9000/student/file/'+preFile} alt="Files" style={{ width: '100px', height: '100px' }} /> : null}
                        {file ? <img src={preview} alt="Files" style={{ width: '100px', height: '100px' }} /> : null}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default EditStudent;