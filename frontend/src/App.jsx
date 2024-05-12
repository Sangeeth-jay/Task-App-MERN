import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import AddTaskCard from "./components/AddTaskCard";
import TaskCard from "./components/TaskCard";

function App() {

  const [openAdd, setOpenAdd] = useState(false);
  const handleCloseAdd = () => setOpenAdd(false);

  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/")
    .then((res) => {
      setTasks(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  },[]);

  const loadTasks = () => {
    axios.get("http://localhost:5000/")
    .then((res) => {
      setTasks(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-start items-center gap-10 py-10 bg-slate-200">
        <h1 className="text-center text-2xl font-bold text-gray-700">
          My Task App
        </h1>
        <button
          className={`bg-green-700 text-white p-2 font-medium rounded hover:bg-green-800 hover:rounded-md hover:scale-105 duration-200 active:scale-95`}
          onClick={() => setOpenAdd(true)}
        >
          + Add New Task
        </button>
        <div className="flex flex-col gap-4 h-auto w-full items-center overflow-scroll overflow-x-hidden">
        {
          tasks?.map((task) => (
             <TaskCard key = {task._id} id = {task._id} title = {task.title} description = {task.description} dueDate = {moment(task.dueDate).format("DD-MM-YYYY")} status = {task.status} loadTasks = {loadTasks}/>
          ))
        }
        </div>
      </div>
      <AddTaskCard visible = {openAdd} onClose = {handleCloseAdd} loadTasks = {loadTasks}/>
    </>
  );
}

export default App;
