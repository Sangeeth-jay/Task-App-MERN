/* eslint-disable react/prop-types */
import { useState } from "react";
import CommonButton from "./CommonButton";
import Status from "./Status";
import { MdDone, MdClose } from "react-icons/md";
import UpdateTask from "./UpdateTask";
import axios from "axios";

const TaskCard = (props) => {
  const { id, title, description, dueDate, status, loadTasks } = props;

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/${id}`)
    .then(res => res.status === 200 && loadTasks() && alert("Task Deleted 😒"))
    .catch(err => console.log(err))
    
  };

  const updateAsDone = (id) => {
      axios.put(`http://localhost:5000/${id}`,
      {
        status : "done"
      }
      )
      .then(res => res.status === 200 && loadTasks())
      .catch(err => console.log(err))
  }

  const updateAsCancel = (id) => {
    axios.put(`http://localhost:5000/${id}`,
    {
      status : "cancel"
    }
    )
    .then(res => res.status === 200 && loadTasks())
    .catch(err => console.log(err))
  }

  const [openUpdate, setOpenUpdate] = useState(false);
  const handleCloseUpdate = () => setOpenUpdate(false);

  return (
    <>
      <div
        
        className="w-2/5 h-fit p-6 shadow-md flex justify-between bg-slate-100 rounded-md hover:shadow-lg hover:scale-105 duration-300 ease-in-out cursor-pointer"
      >
        <div>
          <div className="flex flex-col gap-2 mb-2 text-slate-700" onClick={() => setOpenUpdate(true)}>
            <div className="text-4xl font-semibold">{title}</div>
            <div className="text-2xl">{description}</div>
            <div className="text-md">Due date : {dueDate}</div>
          </div>

          <div className="flex gap-2">
            <CommonButton
              bgColor={"bg-green-700"}
              bgHoverColor={"bg-green-800"}
              title={"Mark as Done"}
              onClick={() => updateAsDone(id)}
            />
            <CommonButton
              bgColor={"bg-red-700"}
              bgHoverColor={"bg-red-800"}
              title={"Mark as Cancel"}
              onClick={() => updateAsCancel(id)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-12 items-end">
          <div className="flex justify-center items-center w-6 h-6 border-2 border-slate-400 text-slate-400 scale-95  rounded-full hover:scale-105 hover:border-slate-700 hover:text-slate-700 duration-200 ease-in-out">
            <MdClose onClick={() => deleteTask(id)} />
          </div>
          <div className="flex justify-center items-center">
            {status === "done" ? (
              <Status bgColor={"bg-green-700"} icon={<MdDone />} />
            ) : (
              <Status bgColor={"bg-red-700"} icon={<MdClose />} />
            )}
          </div>
        </div>
      </div>
      <UpdateTask visible={openUpdate} onClose={handleCloseUpdate} id={id} title={title} description={description} dueDate={dueDate} loadTasks={loadTasks}/>
    </>
  );
};

export default TaskCard;
