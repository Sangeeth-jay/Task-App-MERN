/* eslint-disable react/prop-types */
import { useState } from "react";
import CommonButton from "./CommonButton";
import axios from "axios";

const UpdateTask = (props) => {
  const { visible, onClose, id, title, description, dueDate, loadTasks } = props;
  const [formData, setFormData] = useState({ title, description, dueDate });

  if (!visible) return null;

  const handleClose = (e) => {
    if (e.target.id === "modal") {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/${id}`, formData)
      .then(res => res.status === 200 && loadTasks())
      .catch(err => console.log(err))
      onClose()
  };

  const handleDelete = () => {
    alert("Task Deleted 😒");
  };

  return (
    <div
      id="modal"
      onClick={handleClose}
      className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex justify-center items-center overflow-hidden"
    >
      <div className="w-fit h-fit p-6 shadow-md flex justify-center items-center bg-slate-100 rounded-md cursor-pointer">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-3">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="h-12 rounded-md pl-2 focus:outline-none focus:ring-1 focus:ring-[#515359]"
              value={formData.title}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="dueDate"
              placeholder="Due Date"
              className="h-12 rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-[#515359]"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            className="h-20 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#515359]"
            value={formData.description}
            onChange={handleInputChange}
          />
          <div className="flex justify-center gap-4">
            <CommonButton
              title={"Update"}
              bgColor={"bg-green-700"}
              bgHoverColor={"bg-green-800"}
              onClick={handleUpdate}
            />
            <CommonButton
              title={"Delete"}
              bgColor={"bg-red-700"}
              bgHoverColor={"bg-red-800"}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
