const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://task-manager:fInIfqic1QcJUNbe@task-manager.e0fcrki.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

// Define the task schema
const taskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
});

// Create the task model
const Task = mongoose.model('Task', taskSchema);

// Routes

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.sendStatus(500);
    }
});

// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        const newTask = req.body;
        const task = await Task.create(newTask);
        res.json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.sendStatus(500);
    }
});

// Complete a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;

        const task = await Task.findByIdAndUpdate(taskId, updatedTask, { new: true });
        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.sendStatus(500);
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting task:', error);
        res.sendStatus(500);
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
