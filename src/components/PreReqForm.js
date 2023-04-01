import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk

const PreReqForm = () => {
  const [courseId, setCourseId] = useState("");
  const [prereqId, setPrereqId] = useState(0);
  const [prereqList, setPrereqList] = useState([]);

  const [upCourseId, setUpCourseId] = useState("");
  const [upPrereqId, setUpPrereqId] = useState(0);

  const [action, setAction] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/prereq").then((response) => {
      setPrereqList(response.data);
    });
  }, [])

  const addPrereq = () => {
    Axios.post("http://localhost:3001/create/prereq", {
      course_id: courseId,
      prereq_id: prereqId
    }).then(() => {
      setPrereqList([
        ...prereqList,
        {
          course_id: courseId,
          prereq_id: prereqId
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = prereqList.find((item) => item.course_id === id);
    setUpCourseId(up_data.course_id)
    setUpPrereqId(up_data.prereq_id)
  }

  const updatePrereq = () => {
    Axios.put(`http://localhost:3001/update/prereq/${pk}`,
      {
        course_id: upCourseId,
        prereq_id: upPrereqId
      })
      .then((res) => {
        setPrereqList(
          prereqList.map((val) => {
            return val.course_id === pk
              ? {
                course_id: upPrereqId,
                prereq_id: upCourseId
              }
              : val;
          })
        );
      })
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/prereq/${id}`).then((res) => {
      setPrereqList(
        prereqList.filter((val) => {
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
                <h3>Prerequisite Form</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Course ID</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Course ID" value={upCourseId} onChange={(event) => {
                      setUpCourseId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Prerequisite ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Prerequisite ID" value={upPrereqId} onChange={(event) => {
                      setUpPrereqId(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={updatePrereq}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Prerequisite Form</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Course ID</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Course ID" onChange={(event) => {
                      setCourseId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Prerequisite ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Prerequisite ID" onChange={(event) => {
                      setPrereqId(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addPrereq}>Submit</button>
                </form>
              </div>
            )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Prerequisites</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {prereqList.length === 0 ? (
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
                        <th scope="col">Prerequisite ID</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prereqList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.course_id}</td>
                              <td>{val.prereq_id}</td>
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

export default PreReqForm