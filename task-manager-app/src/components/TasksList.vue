<template>
  <div>
    <h2>Tasks List</h2>
    <ul>
      <li v-for="task in tasks" :key="task._id">
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <button @click="completeTask(task._id)">Complete</button>
        <button @click="deleteTask(task._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
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
    async completeTask(taskId) {
      try {
        await axios.put(`http://localhost:3000/tasks/${taskId}`, { completed: true });
        this.fetchTasks();
      } catch (error) {
        console.error('Error completing task:', error);
      }
    },
    async deleteTask(taskId) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${taskId}`);
        this.fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
