const saveNewUserInList = window.localStorage.getItem('saveNewUserInList')
const saveCurrentUser = window.localStorage.getItem('saveCurrentUser')
export const isAuthSave = window.localStorage.getItem('isAuthSave')


export default {
    isAuth: isAuthSave ? JSON.parse(isAuthSave) : false,
    usersList: saveNewUserInList ? JSON.parse(saveNewUserInList) : [
        {
            name: "TestName",
            email: "1",
            password: "1",
            id: new Date().getTime(),
            userTodos: {
                currentTodo: [],
                expiredTodo: [],
                completedTodo: []
            }
        }
    ],
    currentUserInfo: saveCurrentUser ? JSON.parse(saveCurrentUser) : []
}