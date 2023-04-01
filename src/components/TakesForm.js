import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk

const TakesForm = () => {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [secId, setSecId] = useState("");
  const [semester, setSemester] = useState(0);
  const [year, setYear] = useState(0);
  const [grade, setGrade] = useState("");
  const [takesList, setTakesList] = useState([]);

  const [upStudentId, setUpStudentId] = useState("");
  const [upCourseId, setUpCourseId] = useState("");
  const [upSecId, setUpSecId] = useState("");
  const [upSemester, setUpSemester] = useState(0);
  const [upYear, setUpYear] = useState(0);
  const [upGrade, setUpGrade] = useState("");

  const [action, setAction] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/takes").then((response) => {
      setTakesList(response.data);
    });
  }, [])

  const addTakes = () => {
    Axios.post("http://localhost:3001/create/takes", {
      id: studentId,
      course_id: courseId,
      sec_id: secId,
      semester: semester,
      year: year,
      grade: grade
    }).then(() => {
      setTakesList([
        ...takesList,
        {
          id: studentId,
          course_id: courseId,
          sec_id: secId,
          semester: semester,
          year_: year,
          grade: grade
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = takesList.find((item) => item.id === id);
    setUpStudentId(up_data.id)
    setUpCourseId(up_data.course_id)
    setUpSecId(up_data.sec_id)
    setUpSemester(up_data.semester)
    setUpYear(up_data.year_)
    setUpGrade(up_data.grade)
  }

  const updateTakes = () => {
    Axios.put(`http://localhost:3001/update/takes/${pk}`,
      {
        id: upStudentId,
        course_id: upCourseId,
        sec_id: upSecId,
        semester: upSemester,
        year: upYear,
        grade: upGrade
      })
      .then((res) => {
        setTakesList(
          takesList.map((val) => {
            return val.id === pk
              ? {
                id: upStudentId,
                course_id: upCourseId,
                sec_id: upSecId,
                semester: upSemester,
                year_: upYear,
                grade: upGrade
              }
              : val;
          })
        );
      })
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/takes/${id}`).then((res) => {
      setTakesList(
        takesList.filter((val) => {
          return val.id !== id;
        })
      );
    })
  }

  return (
    <>
      {(() => {
        switch (action) {
          case "update":
            return (
              <div className="container mt-4">
                <h3>Update Takes</h3>
                <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Student ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Student ID" value={upStudentId} onChange={(event) => {
                      setUpStudentId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Course ID</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={upCourseId} placeholder="Enter Course ID" onChange={(event) => {
                      setUpCourseId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Section ID</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Section ID" value={upSecId} onChange={(event) => {
                      setUpSecId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Semester</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Semester" value={upSemester} onChange={(event) => {
                      setUpSemester(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Year</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Year" value={upYear} onChange={(event) => {
                      setUpYear(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Grade</label>
                    <input required={true} type="text" max="2" className="form-control" id="exampleInputPassword1" placeholder="Enter Grade" value={upGrade} onChange={(event) => {
                      setUpGrade(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={updateTakes}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Create Takes</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Student ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Student ID" onChange={(event) => {
                      setStudentId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Course ID</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Course ID" onChange={(event) => {
                      setCourseId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Section ID</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Section ID" onChange={(event) => {
                      setSecId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Semester</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Semester" onChange={(event) => {
                      setSemester(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Year</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Year" onChange={(event) => {
                      setYear(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Grade</label>
                    <input required={true} type="text" max="2" className="form-control" id="exampleInputPassword1" placeholder="Enter Grade" onChange={(event) => {
                      setGrade(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addTakes}>Submit</button>
                </form>
              </div>
            )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Takes</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {takesList.length === 0 ? (
                  <>
                    <hr />
                    <h4 className='text-danger text-center mt-4'>No data found!</h4>
                  </>
                ) : (

                  <table className="table text-center table-bordered mt-4">
                    <thead>
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Student ID</th>
                        <th scope="col">Course ID</th>
                        <th scope="col">Section ID</th>
                        <th scope="col">Semester</th>
                        <th scope="col">Year</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {takesList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.id}</td>
                              <td>{val.course_id}</td>
                              <td>{val.sec_id}</td>
                              <td>{val.semester}</td>
                              <td>{val.year_}</td>
                              <td>{val.grade}</td>
                              <td>
                                <div className="container d-flex align-items-center" style={{ justifyContent: "space-evenly" }}>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-success' onClick={() => { updateItemForm(val.id) }}>&#9998; Update</button>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-danger' onClick={() => { deleteItem(val.id) }}>&#128465; Delete</button>
                                </div>
                              </td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )
        }
      })()}
    </>
  )
}

export default TakesForm