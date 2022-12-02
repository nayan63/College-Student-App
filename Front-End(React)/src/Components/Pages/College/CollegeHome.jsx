import { Link, Outlet } from "react-router-dom";

const CollegeHome = ()=>{
    return (
        <div>
            <div className="left-side">
                <ul>
                    <Link to='list'><li>List</li></Link>
                    <Link to='add'><li>Add</li></Link>
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

export default CollegeHome;