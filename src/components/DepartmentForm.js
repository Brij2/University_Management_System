import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk

const DepartmentForm = () => {
  const [deptName, setDeptName] = useState("");
  const [building, setBuilding] = useState("");
  const [budget, setBudget] = useState(0);
  const [DeptList, setDeptList] = useState([]);

  const [upDeptName, setUpDeptName] = useState("");
  const [upBuilding, setUpBuilding] = useState("");
  const [upBudget, setUpBudget] = useState(0);

  const [action, setAction] = useState("");
  const [Error, setError] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/department").then((response, err) => {
      if(response.status == 200){
        // console.log("*****************")
        setDeptList(response.data);
      }
      else {
        setAction("error");
        console.log("bri errorr:---------",err)
        setError(err);
      }
    });
  }, [])

  const addDept = () => {
    Axios.post("http://localhost:3001/create/department", {
      dept_name: deptName,
      building: building,
      budget: budget
    }).then(() => {
      setDeptList([
        ...DeptList,
        {
          dept_name: deptName,
          building: building,
          budget: budget
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = DeptList.find((item) => item.dept_name === id);
    setUpDeptName(up_data.dept_name)
    setUpBuilding(up_data.building)
    setUpBudget(up_data.budget)
  }

  const updateDept = () => {
    Axios.put(`http://localhost:3001/update/department/${pk}`,
      {
        dept_name: upDeptName,
        building: upBuilding,
        budget: upBudget
      })
      .then((res) => {
        setDeptList(
          DeptList.map((val) => {
            return val.dept_name === pk
              ? {
                dept_name: upDeptName,
                building: upBuilding,
                budget: upBudget
              }
              : val;
          })
        );
      })
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/department/${id}`).then((res) => {
      setDeptList(
        DeptList.filter((val) => {
          return val.dept_name !== id;
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
                <h3>Update Department</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Department Name</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={upDeptName} placeholder="Enter Department Name" onChange={(event) => {
                      setUpDeptName(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Building</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Building" value={upBuilding} onChange={(event) => {
                      setUpBuilding(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Budget</label>
                    <input required={true} type="number" step=".01" className="form-control" id="exampleInputPassword1" value={upBudget} placeholder="Enter Department Budget" onChange={(event) => {
                      setUpBudget(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={updateDept}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Create Department</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Department Name</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Department Name" onChange={(event) => {
                      setDeptName(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Building</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Building" onChange={(event) => {
                      setBuilding(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Budget</label>
                    <input required={true} type="number" step=".01" className="form-control" id="exampleInputPassword1" placeholder="Enter Department Budget" onChange={(event) => {
                      setBudget(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addDept}>Submit</button>
                </form>
              </div>
            )

            case "error":
              return (
                <div className="container mt-4">
                  <h3>Error</h3>
                  some Error : {Error}
                </div>
              )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Departments</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {DeptList.length === 0 ? (
                  <>
                    <hr />
                    <h4 className='text-danger text-center mt-4'>No data found!</h4>

                    <h4>{Error}</h4>
                  </>
                ) : (

                  <table className="table text-center table-bordered mt-4">
                    <thead>
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Department Name</th>
                        <th scope="col">Building</th>
                        <th scope="col">Budget</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DeptList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.dept_name}</td>
                              <td>{val.building}</td>
                              <td>{val.budget}</td>
                              <td>
                                <div className="container d-flex align-items-center" style={{ justifyContent: "space-evenly" }}>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-success' onClick={() => { updateItemForm(val.dept_name) }}>&#9998; Update</button>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-danger' onClick={() => { deleteItem(val.dept_name) }}>&#128465; Delete</button>
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

export default DepartmentForm