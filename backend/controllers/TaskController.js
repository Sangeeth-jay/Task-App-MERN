const taskSchema = require('../model/TaskSchema');

const tasks =async (req, res) => {
    try {
        const tasks = await taskSchema.find(); 
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
};

const setTask = async (req, res) => {
    const newTask = new taskSchema(req.body);
    try {
        if(newTask.title && newTask.description && newTask.status) {
            await newTask.save();
            res.status(202).json({msg: "Task added successfully"});
        } else {
            res.status(400).json({msg: "Task not added"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = taskSchema.findById(taskId);
        if(task) {
            await taskSchema.deleteOne({_id: taskId});
            res.status(200).json({msg: "Task deleted successfully"});
        } else {
            res.status(404).json({msg: "Task not found"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const task = taskSchema.findById(taskId);
    try {
        if(task) {
            await taskSchema.updateOne({_id: taskId}, req.body);
            res.status(200).json({msg: "Task updated successfully"});
        } else {
            res.status(404).json({msg: "Task not found"});
        } 
    } catch (error) {
        res.status(500).json(error);
    }
    
}


module.exports = {
    tasks,
    setTask,
    deleteTask,
    updateTask
}