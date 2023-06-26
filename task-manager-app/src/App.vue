<template>
  <div class="app">
    <h1>Task Manager</h1>
    <router-link to="/">Tasks</router-link>
<!--    <router-link to="/add">Add Task</router-link>-->
    <router-link :to="{ name: 'TaskForm' }">Add Task</router-link>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      newTask: {
        title: '',
        completed: false,
      },
      tasks: [],
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error retrieving tasks:', error);
      }
    },
    async addTask() {
      try {
        const response = await axios.post('http://localhost:3000/tasks', this.newTask);
        this.tasks.push(response.data);
        this.newTask.title = '';
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
    async toggleComplete(task) {
      try {
        const updatedTask = {...task, completed: !task.completed};
        const response = await axios.put(`http://localhost:3000/tasks/${task._id}`, updatedTask);
        task.completed = response.data.completed;
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    async deleteTask(task) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${task._id}`);
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
};
</script>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
}

.task-input {
  margin-bottom: 1rem;
}

.task-list {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.completed {
  text-decoration: line-through;
}
</style>
