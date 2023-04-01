import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk = 0

const AdvisorForm = () => {
  const [sId, setsId] = useState(0);
  const [iId, setiId] = useState(0);
  const [advisorList, setAdvisorList] = useState([]);

  const [upSId, setUpSId] = useState(0);
  const [upIId, setUpIId] = useState(0);

  const [action, setAction] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/advisor").then((response) => {
      setAdvisorList(response.data);
    });
  }, [])

  const addAdvisor = () => {
    Axios.post("http://localhost:3001/create/advisor", {
      s_id: sId,
      i_id: iId
    }).then(() => {
      setAdvisorList([
        ...advisorList,
        {
          s_id: sId,
          i_id: iId
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = advisorList.find((item) => item.s_id === id);
    setUpSId(up_data.s_id)
    setUpIId(up_data.i_id)
  }

  const updateAdvisor = () => {
    Axios.put(`http://localhost:3001/update/advisor/${pk}`,
      {
        s_id: upSId,
        i_id: upIId
      })
      .then((res) => {
        setAdvisorList(
          advisorList.map((val) => {
            return val.s_id === pk
              ? {
                s_id: upSId,
                i_id: upIId
              }
              : val;
          })
        );
      })
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/advisor/${id}`).then((res) => {
      setAdvisorList(
        advisorList.filter((val) => {
          return val.s_id !== id;
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
                <h3>Update Advisor</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Student ID</label>
                    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required={true} placeholder="Enter Student ID" value={upSId} onChange={(event) => {
                      setUpSId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Instructor ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Instructor ID" value={upIId} onChange={(event) => {
                      setUpIId(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={updateAdvisor}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Create Advisor</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Student ID</label>
                    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required={true} placeholder="Enter Student ID" onChange={(event) => {
                      setsId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Instructor ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Instructor ID" onChange={(event) => {
                      setiId(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addAdvisor}>Submit</button>
                </form>
              </div>
            )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Advisors</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {advisorList.length === 0 ? (
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
                        <th scope="col">Instructor ID</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {advisorList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.s_id}</td>
                              <td>{val.i_id}</td>
                              <td>
                                <div className="container d-flex align-items-center" style={{ justifyContent: "space-evenly" }}>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-success' onClick={() => { updateItemForm(val.s_id) }}>&#9998; Update</button>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-danger' onClick={() => { deleteItem(val.s_id) }}>&#128465; Delete</button>
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

export default AdvisorForm