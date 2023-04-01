import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk

const SectionForm = () => {
  const [courseId, setCourseId] = useState("");
  const [secId, setSecId] = useState("");
  const [semester, setSemester] = useState(0);
  const [year, setYear] = useState(0);
  const [building, setBuilding] = useState("");
  const [roomno, setRoomno] = useState(0);
  const [timeSlotId, setTimeSlotId] = useState(0);
  const [sectionList, setSectionList] = useState([]);

  const [upCourseId, setUpCourseId] = useState("");
  const [upSecId, setUpSecId] = useState("");
  const [upSemester, setUpSemester] = useState(0);
  const [upYear, setUpYear] = useState(0);
  const [upBuilding, setUpBuilding] = useState("");
  const [upRoomno, setUpRoomno] = useState(0);
  const [upTimeSlotId, setUpTimeSlotId] = useState(0);

  const [action, setAction] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/section").then((response) => {
      setSectionList(response.data);
    });
  }, [])

  const addSection = () => {
    Axios.post("http://localhost:3001/create/section", {
      course_id: courseId,
      sec_id: secId,
      semester: semester,
      year: year,
      building: building,
      room_number: roomno,
      time_slot_id: timeSlotId
    }).then(() => {
      setSectionList([
        ...sectionList,
        {
          course_id: courseId,
          sec_id: secId,
          semester: semester,
          year_: year,
          building: building,
          room_number: roomno,
          time_slot_id: timeSlotId
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = sectionList.find((item) => item.sec_id === id);
    setUpCourseId(up_data.course_id)
    setUpSecId(up_data.sec_id)
    setUpSemester(up_data.semester)
    setUpYear(up_data.year_)
    setUpBuilding(up_data.building)
    setUpRoomno(up_data.room_number)
    setUpTimeSlotId(up_data.time_slot_id)
  }

  const updateSection = () => {
    Axios.put(`http://localhost:3001/update/section/${pk}`,
      {
        course_id: upCourseId,
        sec_id: upSecId,
        semester: upSemester,
        year: upYear,
        building: upBuilding,
        room_number: upRoomno,
        time_slot_id: upTimeSlotId
      })
      .then((res) => {
        setSectionList(
          sectionList.map((val) => {
            return val.sec_id === pk
              ? {
                course_id: upCourseId,
                sec_id: upSecId,
                semester: upSemester,
                year: upYear,
                building: upBuilding,
                room_number: upRoomno,
                time_slot_id: upTimeSlotId
              }
              : val;
          })
        );
      })
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/section/${id}`).then((res) => {
      setSectionList(
        sectionList.filter((val) => {
          return val.sec_id !== id;
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
                <h3>Update Section</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Course ID</label>
                    <input required={true} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Course ID" value={upCourseId} onChange={(event) => {
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
                    <label for="exampleInputPassword1">Building</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Building" value={upBuilding} onChange={(event) => {
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
                    <label for="exampleInputPassword1">Time Slot ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Time Slot ID" value={upTimeSlotId} onChange={(event) => {
                      setUpTimeSlotId(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={updateSection}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Create Section</h3>
                <form>
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
                    <label for="exampleInputPassword1">Building</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Building" onChange={(event) => {
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
                    <label for="exampleInputPassword1">Time Slot ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Time Slot ID" onChange={(event) => {
                      setTimeSlotId(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addSection}>Submit</button>
                </form>
              </div>
            )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Sections</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {sectionList.length === 0 ? (
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
                        <th scope="col">Section ID</th>
                        <th scope="col">Semester</th>
                        <th scope="col">Year</th>
                        <th scope="col">Building</th>
                        <th scope="col">Room No.</th>
                        <th scope="col">Time-slot ID</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sectionList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.course_id}</td>
                              <td>{val.sec_id}</td>
                              <td>{val.semester}</td>
                              <td>{val.year_}</td>
                              <td>{val.building}</td>
                              <td>{val.room_number}</td>
                              <td>{val.time_slot_id}</td>
                              <td>
                                <div className="container d-flex align-items-center" style={{ justifyContent: "space-evenly" }}>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-success' onClick={() => { updateItemForm(val.sec_id) }}>&#9998; Update</button>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-danger' onClick={() => { deleteItem(val.sec_id) }}>&#128465; Delete</button>
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

export default SectionForm