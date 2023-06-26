<template>
  <li>
    <span :class="{ 'completed-task': taskCopy.completed }">{{ taskCopy.title }}</span>
    <button @click="toggleComplete">{{ taskCopy.completed ? 'Undo' : 'Complete' }}</button>
    <button @click="deleteTask">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      taskCopy: { ...this.task },
    };
  },
  methods: {
    toggleComplete() {
      this.taskCopy.completed = !this.taskCopy.completed;
    },
    deleteTask() {
      this.$emit('delete', this.taskCopy.id);
    },
  },
};
</script>

<style>
.completed-task {
  text-decoration: line-through;
}
</style>
