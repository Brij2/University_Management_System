import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Navbar from './components/Navbar';
import Home from './components/Home';
import StudentForm from './components/StudentForm';
import AdvisorForm from "./components/AdvisorForm";
import InstructorForm from "./components/InstructorForm";
import ClassroomForm from "./components/ClassroomForm";
import CourseForm from "./components/CourseForm";
import DepartmentForm from "./components/DepartmentForm";
import PreReqForm from "./components/PreReqForm";
import SectionForm from "./components/SectionForm";
import TakesForm from "./components/TakesForm";
import TeachesForm from "./components/TeachesForm";
import TimeSlotForm from "./components/TimeSlotForm";

function App() {
  return (
    <>
    <Router>
        <Navbar />

        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          {/* <Route exact path="/config" element={<Home />}/> */}
          <Route exact path="/forms/student" element={<StudentForm />}/>
          <Route exact path="/forms/advisor" element={<AdvisorForm />}/>
          <Route exact path="/forms/instructor" element={<InstructorForm />}/>
          <Route exact path="/forms/classroom" element={<ClassroomForm />}/>
          <Route exact path="/forms/course" element={<CourseForm />}/>
          <Route exact path="/forms/department" element={<DepartmentForm />}/>
          <Route exact path="/forms/prereq" element={<PreReqForm />}/>
          <Route exact path="/forms/section" element={<SectionForm />}/>
          <Route exact path="/forms/takes" element={<TakesForm />}/>
          <Route exact path="/forms/teaches" element={<TeachesForm />}/>
          <Route exact path="/forms/timeslot" element={<TimeSlotForm />}/>
        </Routes>

        </div>
      </Router>
    
    </>
  );
}

export default App;
