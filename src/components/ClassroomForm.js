import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk = 0

const ClassroomForm = () => {
  const [building, setBuilding] = useState("");
  const [roomno, setRoomno] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [classroomList, setClassroomList] = useState([]);

  const [upBuilding, setUpBuilding] = useState("");
  const [upRoomno, setUpRoomno] = useState(0);
  const [upCapacity, setUpCapacity] = useState(0);

  const [action, setAction] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/classroom").then((response) => {
      setClassroomList(response.data);
    });
  }, [])

  const addClassroom = () => {
    Axios.post("http://localhost:3001/create/classroom", {
      building: building,
      room_no: roomno,
      capacity: capacity
    }).then(() => {
      setClassroomList([
        ...classroomList,
        {
          building: building,
          room_no: roomno,
          capacity: capacity
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = classroomList.find((item) => item.room_number === id);
    setUpBuilding(up_data.building)
    setUpRoomno(up_data.room_number)
    setUpCapacity(up_data.capacity)
  }

  const updateClassroom = () => {
    Axios.put(`http://localhost:3001/update/classroom/${pk}`, {building: upBuilding,
    room_number: upRoomno,
    capacity: upCapacity})
    .then((res) => {
      setClassroomList(
        classroomList.map((val) => {
          return val.room_number === pk
            ? {
              building: upBuilding,
              room_number: upRoomno,
              capacity: upCapacity
              }
            : val;
        })
      );
    })
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/classroom/${id}`).then((res) => {
      setClassroomList(
        classroomList.filter((val) => {
          return val.room_number !== id;
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
                <h3>Update Classroom</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Building</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter building" value={upBuilding} onChange={(event) => {
                      setUpBuilding(event.target.value);
                  }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Room Number</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Room Number" value={upRoomno} onChange={(event) => {
                    setUpRoomno(event.target.value);
                  }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Capacity</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" value={upCapacity} placeholder="Enter Capacity of classroom" onChange={(event) => {
                    setUpCapacity(event.target.value);
                  }} />
                  </div>

                  <button className="btn btn-primary" onClick={() => {updateClassroom()}}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Create Classroom</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Building</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter building" onChange={(event) => {
                      setBuilding(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Room Number</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Room Number" onChange={(event) => {
                      setRoomno(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Capacity</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Capacity of classroom" onChange={(event) => {
                      setCapacity(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addClassroom}>Submit</button>
                </form>
              </div>
            )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Classrooms</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {classroomList.length === 0 ? (
                  <>
                    <hr />
                    <h4 className='text-danger text-center mt-4'>No data found!</h4>
                  </>
                ) : (

                  <table className="table table-bordered mt-4">
                    <thead>
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Building</th>
                        <th scope="col">Room No.</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classroomList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.building}</td>
                              <td>{val.room_number}</td>
                              <td>{val.capacity}</td>
                              <td>
                                <div className="container d-flex align-items-center" style={{ justifyContent: "space-evenly" }}>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-success' onClick={() => { updateItemForm(val.room_number)}}>&#9998; Update</button>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-danger' onClick={() => {deleteItem(val.room_number)}}>&#128465; Delete</button>
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

export default ClassroomForm