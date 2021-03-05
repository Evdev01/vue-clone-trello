export const getUserList = (state) => {
    return state.usersList
}
export const getCurrentUserInfo = (state) => {
    return state.currentUserInfo
}
export const isAuthCheck = (state) => {
    return state.isAuth
}
export const getCurrentTodoUser = (state) => {
    // return state.currentUserInfo[0].userTodos.currentTodo
    return state.currentUserInfo[0]
}

export const getState = (state) => {
    return state
}
