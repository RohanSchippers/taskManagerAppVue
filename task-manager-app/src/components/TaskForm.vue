<template>
  <div>
    <h2>Add Task</h2>
    <form @submit.prevent="addTask">
      <input type="text" v-model="title" placeholder="Task title" required/>
      <button type="submit">Add</button>
    </form>
    <p v-if="isTaskAdded">Task added successfully!</p>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'TaskForm',
  data() {
    return {
      title: '',
      isTaskAdded: false,
    };
  },
  methods: {
    async addTask() {
      try {
        await axios.post('http://localhost:3000/tasks', { title: this.title });
        this.isTaskAdded = true;
        this.title = '';

        // Reset isTaskAdded after 3 seconds
        setTimeout(() => {
          this.isTaskAdded = false;
        }, 3000);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
  },
};
</script>



