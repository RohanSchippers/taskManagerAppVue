import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            tasks: [],
        };
    },
    mutations: {
        addTask(state, task) {
            state.tasks.push(task);
        },
    },
});

export default store;
