import { Link, Outlet } from "react-router-dom";

const StudentHome = ()=>{
    return (
        <div>
            <div className="left-side">
                <ul>
                    <Link to='list'><li>List</li></Link>
                    <Link to='add'><li>Add</li></Link>
                    <Link to='search-by-college'><li>Search By College</li></Link>
                    <Link to='search-by-id'><li>Search By ID</li></Link>
                </ul>
            </div>
            <div className="right-side">
                <div className="college-section">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default StudentHome;