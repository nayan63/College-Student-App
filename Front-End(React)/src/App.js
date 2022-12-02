import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Common/Footer';
import Header from './Components/Common/Header';
import AddCollege from './Components/Pages/College/AddCollege';
import CollegeHome from './Components/Pages/College/CollegeHome';
import ListCollege from './Components/Pages/College/ListCollege';
import Home from './Components/Pages/Home';
import AddStudent from './Components/Pages/Student/AddStudent';
import EditStudent from './Components/Pages/Student/EditStudent';
import ListStudent from './Components/Pages/Student/ListStudent';
import SeacrchByCollege from './Components/Pages/Student/SearchByCollege';
import SeacrchById from './Components/Pages/Student/SearchById';
import StudentHome from './Components/Pages/Student/StudentHome';

function App() {
  return (
    <>
      <Header />
      <section className='main-container'>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='college' element={<CollegeHome />} >
            <Route path='add' element={<AddCollege />} />
            <Route path='list' element={<ListCollege />} />
          </Route>

          <Route path='student' element={<StudentHome />} >
            <Route path='add' element={<AddStudent />} />
            <Route path='edit/:id' element={<EditStudent />} />
            <Route path='list' element={<ListStudent />} />
            <Route path='search-by-college' element={<SeacrchByCollege />} />
            <Route path='search-by-id' element={<SeacrchById />} />
          </Route>

        </Routes>
      </section>
      <Footer />
    </>
  );
}

export default App;
