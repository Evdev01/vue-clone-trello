export default {
    mutations: {
        removeTodo(state, index) {
            state.todos.splice(index, 1)
        },
        removeTodoCompleted(state, index) {
            state.completed.splice(index, 1)
        },
        removeTodoExpired(state, index) {
            state.inProgress.splice(index, 1)
        },
        addTodo(state, todo) {
            state.todos.unshift(todo)
        },
        todoCompleted(state, todo) {
            state.completed.unshift(todo)
            state.todos.splice(todo, 1)
        },
        todoExpired(state, todo) {
            state.inProgress.unshift(todo)
            state.todos.splice(todo, 1)
        }
    },
    actions: {
        removeTodo(ctx, index) {
            ctx.commit('removeTodo', index)
        },
        removeTodoCompleted(ctx, index) {
            ctx.commit('removeTodoCompleted', index)
        },
        removeTodoExpired(ctx, index) {
            ctx.commit('removeTodoExpired', index)
        },
        addTodo(ctx, todo) {
            ctx.commit('addTodo', todo)
        },
        todoCompleted(ctx, todo) {
            ctx.commit('todoCompleted', todo)
        },
        todoExpired(ctx, todo) {
            ctx.commit('todoExpired', todo)
        },
    },
    state: {
        todos: [
            {
                title: 'First Note',
                description: 'Description for first note',
                date: new Date(Date.now()).toLocaleString(),
                completed: true
            },
            {
                title: 'Second Note',
                description: 'Description for second note',
                date: new Date(Date.now()).toLocaleString(),
                completed: true
            },
            {
                title: 'Third Note',
                description: 'Description for third note',
                date: new Date(Date.now()).toLocaleString(),
                completed: true
            }
        ],
        inProgress: [],
        completed: [],
    },
    getters: {
        todoList(state) {
            return state.todos
        },
        todoCompletedList(state) {
            return state.completed
        },
        todoExpiredList(state) {
            return state.inProgress
        },
    }
}