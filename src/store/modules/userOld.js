// export const saveNewUserInList = window.localStorage.getItem('saveNewUserInList')
// export const saveCurrentUser = window.localStorage.getItem('saveCurrentUser')
// export const isAuthSave = window.localStorage.getItem('isAuthSave')
//
//
// export default {
//     mutations: {
//         addTodoUser(state, todo) {
//
//             state.currentUserInfo[0].userTodos.currentTodo.push(todo)
//
//             window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
//             window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
//
//         },
//         saveData(state) {
//             // saving a new user to the list
//             window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
//         },
//         saveDataUser(state) {
//             // saving info current user data
//             window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo))
//         },
//         saveDataUserIsAuth(state) {
//             // saving auth user data
//             window.localStorage.setItem('isAuthSave', JSON.stringify(state.isAuth))
//         },
//         getNewUser(state, newUser) {
//
//             const res = state.usersList.find(user => user.email === newUser.email)
//
//             if (res) {
//                 console.log('A user with this email already exists')
//                 alert('Error, a user with this email already exists')
//             } else {
//                 state.usersList.push(newUser)
//             }
//
//             this.commit('saveData') // saving a new user to the list
//
//         },
//         checkUserData(state, checkUser) {
//
//             let userLogin = state.usersList.find(user => user.email === checkUser.email)
//
//             if (userLogin) {
//                 state.currentUserInfo.push(userLogin)
//                 state.isAuth = true
//             } else {
//                 console.log('Incorrect Email or Password')
//                 alert('Incorrect Email or Password')
//             }
//
//             this.commit('saveDataUser') // saving current user data
//             this.commit('saveDataUserIsAuth') // saving auth data user
//
//         },
//         userExit(state) {
//             state.currentUserInfo = []
//             state.isAuth = false
//
//             this.commit('saveDataUser') // deleting the data of the current user
//             this.commit('saveDataUserIsAuth') // remove auth data user
//         }
//     },
//     actions: {
//         getNewUser(ctx, newUser) {
//             ctx.commit('getNewUser', newUser)
//         },
//         checkUserData(ctx, checkUser) {
//             ctx.commit('checkUserData', checkUser)
//         },
//         addTodoUser(ctx, todo) {
//             ctx.commit('addTodoUser', todo)
//         },
//         userExit(ctx) {
//             ctx.commit('userExit')
//         }
//     },
//     state: {
//         isAuth: isAuthSave ? JSON.parse(isAuthSave) : false,
//         usersList: saveNewUserInList ? JSON.parse(saveNewUserInList) : [
//             {
//                 name: "TestName",
//                 email: "1",
//                 password: "1",
//                 id: new Date().getTime(),
//                 userTodos: {
//                     currentTodo: [],
//                     expiredTodo: [],
//                     completedTodo: []
//                 }
//             }
//         ],
//         currentUserInfo: saveCurrentUser ? JSON.parse(saveCurrentUser) : []
//     },
//     getters: {
//         getUserList(state) {
//             return state.usersList
//         },
//         getCurrentUserInfo(state) {
//             return state.currentUserInfo
//         },
//         isAuthCheck(state) {
//             return state.isAuth
//         },
//         getCurrentTodoUser(state) {
//             return state.currentUserInfo[0].userTodos.currentTodo
//         }
//     }
// }