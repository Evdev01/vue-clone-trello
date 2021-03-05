export const getNewUser = (ctx, newUser) => {
    ctx.commit('getNewUser', newUser)
}
export const checkUserData = (ctx, checkUser) => {
    ctx.commit('checkUserData', checkUser)
}
export const addTodoUserAction = (ctx, todo) => {
    ctx.commit('addTodoUser', todo)
}
export const userExit = (ctx) => {
    ctx.commit('userExit')
}
