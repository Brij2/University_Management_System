import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk

const InstructorForm = () => {
  const [name, setName] = useState("");
  const [deptName, setDeptName] = useState("");
  const [salary, setSalary] = useState(0);
  const [instructorList, setInstructorList] = useState([]);

  const [upName, setUpName] = useState("");
  const [upDeptName, setUpDeptName] = useState("");
  const [upSalary, setUpSalary] = useState(0);

  const [action, setAction] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/instructor").then((response) => {
      setInstructorList(response.data);
    });
  }, [])

  const addInstructor = () => {
    Axios.post("http://localhost:3001/create/instructor", {
      name: name,
      dept_name: deptName,
      salary: salary
    }).then(() => {
      setInstructorList([
        ...instructorList,
        {
          name_: name,
          dept_name: deptName,
          salary: salary
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = instructorList.find((item) => item.id === id);
    setUpName(up_data.name_)
    setUpDeptName(up_data.dept_name)
    setUpSalary(up_data.salary)
  }

  const updateInstructor = () => {
    Axios.put(`http://localhost:3001/update/instructor/${pk}`,
      {
        dept_name: upDeptName,
        name: upName,
        salary: upSalary
      })
      .then((res) => {
        setInstructorList(
          instructorList.map((val) => {
            return val.id === pk
              ? {
                dept_name: upDeptName,
                name_: upName,
                salary: upSalary
              }
              : val;
          })
        );
      })
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/instructor/${id}`).then((res) => {
      setInstructorList(
        instructorList.filter((val) => {
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
                <h3>Update Instructor</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" value={upName} onChange={(event) => {
                      setUpName(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Department</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Department name" value={upDeptName} onChange={(event) => {
                      setUpDeptName(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Salary</label>
                    <input required={true} type="number" step=".01" className="form-control" id="exampleInputPassword1" placeholder="Enter Salary" value={upSalary} onChange={(event) => {
                      setUpSalary(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={updateInstructor}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Create Instructor</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" onChange={(event) => {
                      setName(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Department</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Department name" onChange={(event) => {
                      setDeptName(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Salary</label>
                    <input required={true} type="number" step=".01" className="form-control" id="exampleInputPassword1" placeholder="Enter Salary" onChange={(event) => {
                      setSalary(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addInstructor}>Submit</button>
                </form>
              </div>
            )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Instructors</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {instructorList.length === 0 ? (
                  <>
                    <hr />
                    <h4 className='text-danger text-center mt-4'>No data found!</h4>
                  </>
                ) : (

                  <table className="table text-center table-bordered mt-4">
                    <thead>
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Instructor ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instructorList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.id}</td>
                              <td>{val.name_}</td>
                              <td>{val.dept_name}</td>
                              <td>{val.salary}</td>
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

export default InstructorForm