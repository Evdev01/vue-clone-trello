// export const addTodoUser = (state, todo) => {
//
//     state.currentUserInfo[0].userTodos.currentTodo.push(todo)
//
//     window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
//     window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
//
// }

import isAuthSave from './state'

export const saveData = (state) => {
    // saving a new user to the list
    window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
}

export const saveDataUser = (state) => {
    // saving info current user data
    window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo))
}
export const saveDataUserIsAuth = (state) => {
    // saving auth user data
    window.localStorage.setItem(isAuthSave, JSON.stringify(state.isAuth))
}
export const getNewUser = (state, newUser) => {

    const res = state.usersList.find(user => user.email === newUser.email)

    if (res) {
        console.log('A user with this email already exists')
        alert('Error, a user with this email already exists')
    } else {
        state.usersList.push(newUser)
    }

    this.commit('saveData') // saving a new user to the list

}
export const checkUserData = (state, checkUser) => {


    let userLogin = state.usersList.find(user => user.email === checkUser.email)

    if (userLogin) {
        state.currentUserInfo.push(userLogin)
        state.isAuth = true
    } else {
        console.log('Incorrect Email or Password')
        alert('Incorrect Email or Password')
    }

    // this.commit('saveDataUser') // saving current user data
    this.commit('saveDataUserIsAuth') // saving auth data user

}
export const userExit = (state) => {
    state.currentUserInfo = []
    state.isAuth = false

    this.commit('saveDataUser') // deleting the data of the current user
    this.commit('saveDataUserIsAuth') // remove auth data user
}
