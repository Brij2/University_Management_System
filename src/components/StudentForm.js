import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk

const StudentForm = () => {
  const [name, setName] = useState("");
  const [deptName, setDeptName] = useState("");
  const [totCred, setTotCred] = useState(0);
  const [studentList, setStudentList] = useState([]);

  const [upName, setUpName] = useState("");
  const [upDeptName, setUpDeptName] = useState("");
  const [upTotCred, setUpTotCred] = useState(0);

  const [action, setAction] = useState("");
  const [Error, setError] = useState("");

  useEffect(() => {
    Axios.get("https://ums-gblx.onrender.com/student").then((response, err) => {

    if(response.status == 200){
      // console.log("*****************")
      setStudentList(response.data);
    }
    else {
      setAction("error");
      console.log("bri errorr:---------",err)
      setError(err);
    }
      
    });
  }, [])

  const addStudent = () => {
    Axios.post("https://ums-gblx.onrender.com/create/student", {
      name: name,
      dept_name: deptName,
      tot_cred: totCred
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          name_: name,
          dept_name: deptName,
          tot_cred: totCred
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = studentList.find((item) => item.id === id);
    setUpName(up_data.name_)
    setUpDeptName(up_data.dept_name)
    setUpTotCred(up_data.tot_cred)
  }

  const updateStudent = () => {
    Axios.put(`https://ums-gblx.onrender.com/update/student/${pk}`,
      {
        name: upName,
        dept_name: upDeptName,
        tot_cred: upTotCred
      })
      .then((res) => {
        setStudentList(
          studentList.map((val) => {
            return val.id === pk
              ? {
                name_: upName,
                dept_name: upDeptName,
                tot_cred: upTotCred
              }
              : val;
          })
        );
      })
  }

  const deleteItem = (id) => {
    Axios.delete(`https://ums-gblx.onrender.com/delete/student/${id}`).then((res) => {
      setStudentList(
        studentList.filter((val) => {
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
                <h3>Update Student</h3>
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
                    <label for="exampleInputPassword1">Total Credits</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Total Credits" value={upTotCred} onChange={(event) => {
                      setUpTotCred(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={updateStudent}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Create Student</h3>
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
                    <label for="exampleInputPassword1">Total Credits</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Total Credits" onChange={(event) => {
                      setTotCred(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addStudent}>Submit</button>
                </form>
              </div>
            )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Students</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {studentList.length === 0 ? (
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
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Total Credits</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.id}</td>
                              <td>{val.name_}</td>
                              <td>{val.dept_name}</td>
                              <td>{val.tot_cred}</td>
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

export default StudentForm