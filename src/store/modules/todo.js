export default {
    mutations: {
        addTodo(state, todo) {
            state.todos.unshift(todo)
        },
        removeTodo(state, index) {
            state.todos.splice(index, 1)
        },
        removeTodoCompleted(state, index) {
            state.completed.splice(index, 1)
        },
        removeTodoExpired(state, index) {
            state.expired.splice(index, 1)
        },
        todoCompleted(state, todo) {
            state.completed.unshift(todo)
            state.todos.splice(todo, 1)
        },
        todoExpired(state, todo) {
            state.expired.unshift(todo)
            state.todos.splice(todo, 1)
        },
        todoOverdue(state, todo) {
            todo.todoOverdue = true
        },
        todoCompleteInActive(state, todo) {
            state.todos.unshift(todo)
            state.completed.splice(todo, 1)
        },
        todoCompleteInExpired(state, todo) {
            state.expired.unshift(todo)
            state.completed.splice(todo, 1)
        },
        todoExpiredToActive(state, todo) {
            state.todos.unshift(todo)
            state.expired.splice(todo, 1)
        },
        todoExpiredToCompleted(state, todo) {
            state.completed.unshift(todo)
            state.expired.splice(todo, 1)
        },
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
        todoOverdue(ctx, todo) {
            ctx.commit('todoOverdue', todo)
        },
        todoCompleteInActive(ctx, todo) {
            ctx.commit('todoCompleteInActive', todo)
        },
        todoCompleteInExpired(ctx, todo) {
            ctx.commit('todoCompleteInExpired', todo)
        },
        todoExpiredToActive(ctx, todo) {
            ctx.commit('todoExpiredToActive', todo)
        },
        todoExpiredToCompleted(ctx, todo) {
            ctx.commit('todoExpiredToCompleted', todo)
        }
    },
    state: {
        todos: [],
        expired: [],
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
            return state.expired
        }
    }
}