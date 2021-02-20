export default {
    mutations: {
        removeTodo(state, id) {
            state.todos.splice(id, 1)
        },
        removeTodoCompleted(state, index) {
            state.completed.splice(index, 1)
        },
        removeTodoExpired(state, index) {
            state.inProgress.splice(index, 1)
        },
        addTodo(state, todo) {
            state.todos.unshift(todo)
            console.log(state.todos)
        },
        todoCompleted(state, todo) {
            state.completed.unshift(todo)
            state.todos.splice(todo, 1)
        },
        todoExpired(state, todo) {
            state.inProgress.unshift(todo)
            state.todos.splice(todo, 1)
        },
        todoOverdue(state, todo) {
            todo.todoOverdue = true
        }
    },
    actions: {
        removeTodo(ctx, id) {
            ctx.commit('removeTodo', id)
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
        todoOverdue(ctx, todo) {
            ctx.commit('todoOverdue', todo)
        }
    },
    state: {
        todos: [],
        inProgress: [],
        completed: []
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
        }
    }
}