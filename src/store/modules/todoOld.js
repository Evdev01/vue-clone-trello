// // let todo = window.localStorage.getItem('todo')
// // let todoExpired = window.localStorage.getItem('todoExpired')
// // let todoComplete = window.localStorage.getItem('todoComplete')
// //
// export default {
// //     mutations: {
// //         addTodo(state, todo) {
// //             state.todos.unshift(todo)
// //
// //             this.commit('saveData')
// //         },
// //         saveData(state) {
// //             window.localStorage.setItem('todo', JSON.stringify(state.todos))
// //         },
// //         saveDataExpired(state) {
// //             window.localStorage.setItem('todoExpired', JSON.stringify(state.expired))
// //         },
// //         saveDataComplete(state) {
// //             window.localStorage.setItem('todoComplete', JSON.stringify(state.completed))
// //         },
// //         removeTodo(state, id) {
// //             state.todos.map(item => {
// //                 if (item.id === id) {
// //                     state.todos.splice(item, 1)
// //                 }
// //             })
// //             this.commit('saveData')
// //         },
// //         removeTodoCompleted(state, id) {
// //             state.completed.map(item => {
// //                 if (item.id === id) {
// //                     state.completed.splice(item, 1)
// //                 }
// //             })
// //             this.commit('saveDataComplete')
// //         },
// //         removeTodoExpired(state, id) {
// //             state.expired.map(item => {
// //                 if (item.id === id) {
// //                     state.expired.splice(item, 1)
// //                 }
// //             })
// //             this.commit('saveDataExpired')
// //         },
// //         todoCompleted(state, todo) {
// //             state.completed.unshift(todo)
// //             state.todos.splice(todo, 1)
// //
// //             this.commit('saveDataComplete')
// //             this.commit('saveData')
// //
// //
// //         },
// //         todoExpired(state, todo) {
// //             state.expired.unshift(todo)
// //             state.todos.splice(todo, 1)
// //
// //
// //             this.commit('saveDataExpired')
// //             this.commit('saveData')
// //
// //
// //         },
// //         todoCompleteInActive(state, todo) {
// //             state.todos.unshift(todo)
// //             state.completed.splice(todo, 1)
// //
// //             this.commit('saveData')
// //             this.commit('saveDataComplete')
// //         },
// //         todoCompleteInExpired(state, todo) {
// //             state.expired.unshift(todo)
// //             state.completed.splice(todo, 1)
// //
// //             this.commit('saveDataComplete')
// //             this.commit('saveDataExpired')
// //
// //
// //         },
// //         todoExpiredToActive(state, todo) {
// //             state.todos.unshift(todo)
// //             state.expired.splice(todo, 1)
// //
// //             this.commit('saveData')
// //             this.commit('saveDataExpired')
// //
// //         },
// //         todoExpiredToCompleted(state, todo) {
// //             state.completed.unshift(todo)
// //             state.expired.splice(todo, 1)
// //
// //             this.commit('saveDataExpired')
// //             this.commit('saveDataComplete')
// //
// //         },
// //         setDateChange(state, id) {
// //             state.todos.map(item => {
// //                 if (item.id === id) {
// //                     item.isSetDate = !item.isSetDate
// //                 }
// //             })
// //         },
// //         todoNotExpiredBackgroundAction(state, id, date) {
// //
// //             state.todos.map(item => {
// //                 if (item.id === id) {
// //                     item.date = date
// //                 }
// //             })
// //         },
// //         todoExpiredBackground(state, id, date) {
// //
// //             state.todos.map(item => {
// //                 if (item.id === id) {
// //                     state.todos.splice(item[id], 1)
// //                     state.expired.unshift(item)
// //                     item.isTodoExpired = true
// //                     item.date = date
// //                 } else {
// //                     item.isTodoExpired = false
// //                 }
// //             })
// //
// //
// //             this.commit('saveData')
// //             this.commit('saveDataExpired')
// //
// //         }
// //     },
// //     actions: {
// //         removeTodo(ctx, id) {
// //             ctx.commit('removeTodo', id)
// //         },
// //         removeTodoCompleted(ctx, id) {
// //             ctx.commit('removeTodoCompleted', id)
// //         },
// //         removeTodoExpired(ctx, id) {
// //             ctx.commit('removeTodoExpired', id)
// //         },
// //         addTodo(ctx, todo) {
// //             ctx.commit('addTodo', todo)
// //         },
// //         todoCompleted(ctx, todo) {
// //             ctx.commit('todoCompleted', todo)
// //         },
// //         todoExpired(ctx, todo) {
// //             ctx.commit('todoExpired', todo)
// //         },
// //         todoCompleteInActive(ctx, todo) {
// //             ctx.commit('todoCompleteInActive', todo)
// //         },
// //         todoCompleteInExpired(ctx, todo) {
// //             ctx.commit('todoCompleteInExpired', todo)
// //         },
// //         todoExpiredToActive(ctx, todo) {
// //             ctx.commit('todoExpiredToActive', todo)
// //         },
// //         todoExpiredToCompleted(ctx, todo) {
// //             ctx.commit('todoExpiredToCompleted', todo)
// //         },
// //         todoExpiredBackgroundAction(ctx, id) {
// //             ctx.commit('todoExpiredBackground', id)
// //         },
// //         todoNotExpiredBackgroundAction(ctx, id) {
// //             ctx.commit('todoNotExpiredBackgroundAction', id)
// //         },
// //         setDateChange(ctx, id) {
// //             ctx.commit('setDateChange', id)
// //         }
// //     },
// //     state: {
// //         todos: todo ? JSON.parse(todo) : [],
// //         expired: todoExpired ? JSON.parse(todoExpired) : [],
// //         completed: todoComplete ? JSON.parse(todoExpired) : []
// //     },
// //     getters: {
// //         todoList(state) {
// //             return state.todos
// //         },
// //         todoCompletedList(state) {
// //             return state.completed
// //         },
// //         todoExpiredList(state) {
// //             return state.expired
// //         }
// //     }
// // }