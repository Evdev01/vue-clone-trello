export const addTodoUser = (state, todo) => {

    console.log(todo)

    state.currentUserInfo[0].userTodos.currentTodo.push(todo)

    window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
    window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList

}

export const removeTodo = (state, id) => {


    console.log(id)

    // state.currentUserInfo.userTodos.currentTodo.map(t => {
    //     if (t.id === id) {
    //         state.currentUserInfo.userTodos.currentTodo.splice(t, 1)
    //     }
    // })

    // state.currentUserInfo.map(item => {
    //     if (item.id === id) {
    //         state.todos.splice(item, 1)
    //     }
    // })
    // this.commit('saveData')
}