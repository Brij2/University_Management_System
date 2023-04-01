import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk

const CourseForm = () => {
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [deptName, setDeptName] = useState("");
  const [credits, setCredits] = useState(0);
  const [courseList, setCourseList] = useState([]);

  const [upCourseId, setUpCourseId] = useState("");
  const [upTitle, setUpTitle] = useState("");
  const [upDeptName, setUpDeptName] = useState("");
  const [upCredits, setUpCredits] = useState(0);

  const [action, setAction] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/course").then((response) => {
      setCourseList(response.data);
    });
  }, [])

  const addCourse = () => {
    Axios.post("http://localhost:3001/create/course", {
      course_id: courseId,
      title: title,
      dept_name: deptName,
      credits: credits
    }).then(() => {
      setCourseList([
        ...courseList,
        {
          course_id: courseId,
          title: title,
          dept_name: deptName,
          credits: credits
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = courseList.find((item) => item.course_id === id);
    setUpCourseId(up_data.course_id)
    setUpTitle(up_data.title)
    setUpDeptName(up_data.dept_name)
    setUpCredits(up_data.credits)
  }

  const updateCourse = () => {
    Axios.put(`http://localhost:3001/update/course/${pk}`,
      {
        course_id: upCourseId,
        title: upTitle,
        dept_name: upDeptName,
        credits: upCredits
      })
      .then((res) => {
        setCourseList(
          courseList.map((val) => {
            return val.course_id === pk
              ? {
                course_id: upCourseId,
                title: upTitle,
                dept_name: upDeptName,
                credits: upCredits
              }
              : val;
          })
        );
      })
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/course/${id}`).then((res) => {
      setCourseList(
        courseList.filter((val) => {
          return val.course_id !== id;
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
                <h3>Update Course</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Course ID</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Course ID" value={upCourseId} onChange={(event) => {
                      setUpCourseId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Title</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Course Title" value={upTitle} onChange={(event) => {
                      setUpTitle(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Department</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Department Name" value={upDeptName} onChange={(event) => {
                      setUpDeptName(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Credits</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Course Credits" value={upCredits} onChange={(event) => {
                      setUpCredits(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={updateCourse}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Create Course</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Course ID</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Course ID" onChange={(event) => {
                      setCourseId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Title</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Course Title" onChange={(event) => {
                      setTitle(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Department</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Department Name" onChange={(event) => {
                      setDeptName(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Credits</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Course Credits" onChange={(event) => {
                      setCredits(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addCourse}>Submit</button>
                </form>
              </div>
            )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Courses</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {courseList.length === 0 ? (
                  <>
                    <hr />
                    <h4 className='text-danger text-center mt-4'>No data found!</h4>
                  </>
                ) : (

                  <table className="table text-center table-bordered mt-4">
                    <thead>
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Course ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Department</th>
                        <th scope="col">Credits</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.course_id}</td>
                              <td>{val.title}</td>
                              <td>{val.dept_name}</td>
                              <td>{val.credits}</td>
                              <td>
                                <div className="container d-flex align-items-center" style={{ justifyContent: "space-evenly" }}>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-success' onClick={() => { updateItemForm(val.course_id) }}>&#9998; Update</button>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-danger' onClick={() => { deleteItem(val.course_id) }}>&#128465; Delete</button>
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

export default CourseForm