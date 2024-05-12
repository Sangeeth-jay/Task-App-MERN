/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import CommonButton from "./CommonButton";

const AddTaskCard = (props) => {

  const {visible, onClose, loadTasks} = props;

  if (!visible) return null;

  const handleClose = (e) => {
    if (e.target.id === "modal") {
      onClose();
    }
  };

  const [newTask, setNewTask] = useState({
    title : "",
    dueDate : "",
    description : "",
    status : "undone"});

  const handleChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
    
  }
  
  const saveTask = () => {
    axios.post("http://localhost:5000/", newTask)
    .then((res) => res.status === 202 && loadTasks())
    .catch((err) => {
      console.log(err);
    })
    onClose();
  };


  return (
    <div
      id="modal"
      onClick={handleClose}
      className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-hidden"
    >
      <div className="w-fit h-fit p-6 shadow-md flex  justify-center items-center bg-slate-100 rounded-md cursor-pointer">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-3">
            <input
              type="text"
              name="title"
              id=""
              placeholder="Title"
              className=" h-12 rounded-md  pl-2 focus:outline-none focus:ring-1 focus:ring-[#515359]"
              onChange={handleChange}
            />
            <input
              type="date"
              name="dueDate"
              id=""
              placeholder="Due Date"
              className=" h-12 rounded-md  pl-2 focus:outline-none focus:ring-1 focus:ring-[#515359]"
              onChange={handleChange}
            />
          </div>
          <textarea
            type=""
            name="description"
            id=""
            placeholder="Description"
            className=" h-20 rounded-md  p-2 focus:outline-none focus:ring-1 focus:ring-[#515359]"
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <CommonButton
              title={"Save"}
              bgColor={"bg-blue-700"}
              bgHoverColor={"bg-blue-800"}
              onClick={() => saveTask()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskCard;
