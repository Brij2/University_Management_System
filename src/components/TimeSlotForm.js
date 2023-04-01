import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";

var pk

const TimeSlotForm = () => {
  const [timeSlotId, setTimeSlotId] = useState(0);
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [timeSlotList, setTimeSlotList] = useState([]);

  const [upTimeSlotId, setUpTimeSlotId] = useState(0);
  const [upDay, setUpDay] = useState("");
  const [upStartTime, setUpStartTime] = useState();
  const [upEndTime, setUpEndTime] = useState();

  const [action, setAction] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/timeslot").then((response) => {
      setTimeSlotList(response.data);
    });
  }, [])

  const addTimeSlot = () => {
    Axios.post("http://localhost:3001/create/timeslot", {
      time_slot_id: timeSlotId,
      day: day,
      start_time: startTime,
      end_time: endTime
    }).then(() => {
      setTimeSlotList([
        ...timeSlotList,
        {
          time_slot_id: timeSlotId,
          day_: day,
          start_time: startTime,
          end_time: endTime
        },
      ]);
    });
  };

  const updateItemForm = (id) => {
    setAction("update");
    pk = id
    const up_data = timeSlotList.find((item) => item.time_slot_id === id);
    setUpTimeSlotId(up_data.time_slot_id)
    setUpDay(up_data.day_)
    setUpStartTime(up_data.start_time)
    setUpEndTime(up_data.end_time)
  }

  const updateTimeSlot = () => {
    Axios.put(`http://localhost:3001/update/timeslot/${pk}`,
      {
        time_slot_id: upTimeSlotId,
        day: upDay,
        start_time: upStartTime,
        end_time: upEndTime
      })
      .then((res) => {
        setTimeSlotList(
          timeSlotList.map((val) => {
            return val.time_slot_id === pk
              ? {
                time_slot_id: upTimeSlotId,
                day_: upDay,
                start_time: upStartTime,
                end_time: upEndTime
              }
              : val;
          })
        );
      })
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/delete/timeslot/${id}`).then((res) => {
      setTimeSlotList(
        timeSlotList.filter((val) => {
          return val.time_slot_id !== id;
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
                <h3>Update Time Slot</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Time Slot ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={upTimeSlotId} placeholder="Enter Time Slot ID" onChange={(event) => {
                      setUpTimeSlotId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Day</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Day" value={upDay} onChange={(event) => {
                      setUpDay(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Start Time</label>
                    <input required={true} type="time" className="form-control" id="exampleInputPassword1" value={upStartTime} onChange={(event) => {
                      setUpStartTime(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">End Time</label>
                    <input required={true} type="time" className="form-control" id="exampleInputPassword1" value={upEndTime} onChange={(event) => {
                      setUpEndTime(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={updateTimeSlot}>Submit</button>
                </form>
              </div>
            )

          case "create":
            return (
              <div className="container mt-4">
                <h3>Create Time Slot</h3>
                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Time Slot ID</label>
                    <input required={true} type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Time Slot ID" onChange={(event) => {
                      setTimeSlotId(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Day</label>
                    <input required={true} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Day" onChange={(event) => {
                      setDay(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Start Time</label>
                    <input required={true} type="time" className="form-control" id="exampleInputPassword1" onChange={(event) => {
                      setStartTime(event.target.value);
                    }} />
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">End Time</label>
                    <input required={true} type="time" className="form-control" id="exampleInputPassword1" onChange={(event) => {
                      setEndTime(event.target.value);
                    }} />
                  </div>

                  <button className="btn btn-primary" onClick={addTimeSlot}>Submit</button>
                </form>
              </div>
            )

          default:
            return (
              <div className="container mt-4">
                <h3 className='text-center'>Time Slots</h3>
                <button className='btn btn-primary' style={{ marginLeft: "auto", height: "fit-content", width: "fit-content" }} onClick={() => { setAction("create") }}>+ Create</button>
                {timeSlotList.length === 0 ? (
                  <>
                    <hr />
                    <h4 className='text-danger text-center mt-4'>No data found!</h4>
                  </>
                ) : (

                  <table className="table text-center table-bordered mt-4">
                    <thead>
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Time Slot ID</th>
                        <th scope="col">Day</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlotList.map((val, key) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{val.time_slot_id}</td>
                              <td>{val.day_}</td>
                              <td>{val.start_time}</td>
                              <td>{val.end_time}</td>
                              <td>
                                <div className="container d-flex align-items-center" style={{ justifyContent: "space-evenly" }}>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-success' onClick={() => { updateItemForm(val.time_slot_id) }}>&#9998; Update</button>
                                  <button style={{ height: "fit-content", width: "fit-content" }} className='btn btn-danger' onClick={() => { deleteItem(val.time_slot_id) }}>&#128465; Delete</button>
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

export default TimeSlotForm