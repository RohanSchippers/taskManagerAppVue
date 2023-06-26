import { createRouter, createWebHistory } from 'vue-router';
import TasksList from '@/components/TasksList.vue';
import TaskForm from '@/components/TaskForm.vue';

const routes = [
    {
        path: '/',
        name: 'Tasks',
        component: TasksList,
    },
    {
        path: '/add',
        name: 'TaskForm',
        component: TaskForm,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
