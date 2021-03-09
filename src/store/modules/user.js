export const saveNewUserInList = window.localStorage.getItem('saveNewUserInList')
export const saveCurrentUser = window.localStorage.getItem('saveCurrentUser')
export const isAuthSave = window.localStorage.getItem('isAuthSave')

export default {
    mutations: {
        addTodoUser(state, todo) {

            state.currentUserInfo[0].userTodos.currentTodo.unshift(todo)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList

        },
        saveData(state) {
            // saving a new user to the list
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        saveDataUser(state) {
            // saving info current user data
            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo))
        },
        saveDataUserIsAuth(state) {
            // saving auth user data
            window.localStorage.setItem('isAuthSave', JSON.stringify(state.isAuth))
        },
        getNewUser(state, newUser) {

            const res = state.usersList.find(user => user.email === newUser.email)

            if (res) {
                console.log('A user with this email already exists')
                alert('Error, a user with this email already exists')
            } else {
                state.usersList.push(newUser)
            }

            this.commit('saveData') // saving a new user to the list

        },
        checkUserData(state, checkUser) {

            let userLogin = state.usersList.find(user => user.email === checkUser.email && user.password === checkUser.password)

            if (userLogin) {
                state.currentUserInfo.push(userLogin)
                state.isAuth = true
            } else {
                console.log('Incorrect Email or Password')
                alert('Incorrect Email or Password')
            }

            this.commit('saveDataUser') // saving current user data
            this.commit('saveDataUserIsAuth') // saving auth data user

        },
        userExit(state) {
            state.currentUserInfo = []
            state.isAuth = false

            this.commit('saveDataUser') // deleting the data of the current user
            this.commit('saveDataUserIsAuth') // remove auth data user
        },
        //    todoAction
        removeTodo(state, index) {

            const currentUserTodosCategories = state.currentUserInfo[0].userTodos

            currentUserTodosCategories.currentTodo.splice(index, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        todoExpired(state, todo) {

            state.currentUserInfo[0].userTodos.expiredTodo.unshift(todo)
            state.currentUserInfo[0].userTodos.currentTodo.splice(todo, 1)


            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        todoCompleted(state, todo) {


            state.currentUserInfo[0].userTodos.completedTodo.unshift(todo)
            state.currentUserInfo[0].userTodos.currentTodo.splice(todo, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        removeTodoExpired(state, index) {
            state.currentUserInfo[0].userTodos.expiredTodo.splice(index, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        todoExpiredInActive(state, todo) {

            state.currentUserInfo[0].userTodos.currentTodo.unshift(todo)
            state.currentUserInfo[0].userTodos.expiredTodo.splice(todo, 1)
            todo.isTodoExpired = false
            todo.date = ''
            todo.isSetDate = false

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList

        },
        todoExpiredInCompleted(state, todo) {
            state.currentUserInfo[0].userTodos.completedTodo.unshift(todo)
            state.currentUserInfo[0].userTodos.expiredTodo.splice(todo, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList

        },
        removeTodoCompleted(state, index) {
            state.currentUserInfo[0].userTodos.completedTodo.splice(index, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        todoCompleteInActive(state, todo) {
            state.currentUserInfo[0].userTodos.currentTodo.unshift(todo)
            state.currentUserInfo[0].userTodos.completedTodo.splice(todo, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        todoCompleteInExpired(state, todo) {
            state.currentUserInfo[0].userTodos.expiredTodo.unshift(todo)
            state.currentUserInfo[0].userTodos.completedTodo.splice(todo, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        isDateSet(state, id) {
            state.currentUserInfo[0].userTodos.currentTodo.map(item => {
                if (item.id === id) {
                    item.isSetDate = !item.isSetDate
                }
            })
        },
        todoExpiredChangeColor(state, id) {

            state.currentUserInfo[0].userTodos.currentTodo.map(todo => {
                if (todo.id === id) {
                    state.currentUserInfo[0].userTodos.currentTodo.splice(todo, 1)
                    state.currentUserInfo[0].userTodos.expiredTodo.unshift(todo)
                }
            })

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        todoNotExpiredChangeColor(state, id) {

            state.currentUserInfo[0].userTodos.currentTodo.map(todo => {
                if (todo.id === id) {
                    todo.isTodoExpired = false
                }
            })

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        changeTitleTodo(state, updateTodo) {


            const findTodoById = state.currentUserInfo[0].userTodos.currentTodo
                .find(todo => todo.id === updateTodo.id)

            findTodoById.title = updateTodo.title



            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        changeDescriptionTodo(state, updatedDescription) {


            const findTodoById = state.currentUserInfo[0].userTodos.currentTodo
                .find(todo => todo.id === updatedDescription.id)

            findTodoById.description = updatedDescription.description



            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        changeTitleExpiredTodo(state, updateTodo) {


            const findTodoById = state.currentUserInfo[0].userTodos.expiredTodo
                .find(todo => todo.id === updateTodo.id)

            findTodoById.title = updateTodo.title



            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        changeDescriptionExpiredTodo(state, updatedDescription) {


            const findTodoById = state.currentUserInfo[0].userTodos.expiredTodo
                .find(todo => todo.id === updatedDescription.id)

            findTodoById.description = updatedDescription.description



            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        changeTitleActiveTodo(state, updateTodo) {


            const findTodoById = state.currentUserInfo[0].userTodos.completedTodo
                .find(todo => todo.id === updateTodo.id)

            findTodoById.title = updateTodo.title



            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        changeDescriptionActiveTodo(state, updatedDescription) {


            const findTodoById = state.currentUserInfo[0].userTodos.completedTodo
                .find(todo => todo.id === updatedDescription.id)

            findTodoById.description = updatedDescription.description



            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
    },
    actions: {
        getNewUser(ctx, newUser) {
            ctx.commit('getNewUser', newUser)
        },
        checkUserData(ctx, checkUser) {
            ctx.commit('checkUserData', checkUser)
        },
        addTodoUser(ctx, todo) {
            ctx.commit('addTodoUser', todo)
        },
        userExit(ctx) {
            ctx.commit('userExit')
        },
        //    todoAction
        removeTodo(ctx, index) {
            ctx.commit('removeTodo', index)
        },
        todoExpired(ctx, todo) {
            ctx.commit('todoExpired', todo)
        },
        todoCompleted(ctx, todo) {
            ctx.commit('todoCompleted', todo)
        },
        removeTodoExpired(ctx, index) {
            ctx.commit('removeTodoExpired', index)
        },
        todoExpiredInActive(ctx, todo) {
            ctx.commit('todoExpiredInActive', todo)
        },
        todoExpiredInCompleted(ctx, todo) {
            ctx.commit('todoExpiredInCompleted', todo)
        },
        removeTodoCompleted(ctx, index) {
            ctx.commit('removeTodoCompleted', index)
        },
        todoCompleteInActive(ctx, todo) {
            ctx.commit('todoCompleteInActive', todo)
        },
        todoCompleteInExpired(ctx, todo) {
            ctx.commit('todoCompleteInExpired', todo)
        },
        isDateSet(ctx, id) {
            ctx.commit('isDateSet', id)
        },
        todoExpiredChangeColor({commit}, id) {
            commit('todoExpiredChangeColor', id)
        },
        todoNotExpiredChangeColor({commit}, id) {
            commit('todoNotExpiredChangeColor', id)
        },
        saveDateSetByUser(ctx, id) {
            ctx.commit('saveDateSetByUser', id)
        },
        changeTitleTodo(ctx, updateTodo) {
            ctx.commit('changeTitleTodo', updateTodo)
        },
        changeDescriptionTodo(ctx, updatedDescription) {
            ctx.commit('changeDescriptionTodo', updatedDescription)
        },
        changeTitleExpiredTodo(ctx, updateTodo) {
            ctx.commit('changeTitleExpiredTodo', updateTodo)
        },
        changeDescriptionExpiredTodo(ctx, updatedDescription) {
            ctx.commit('changeDescriptionExpiredTodo', updatedDescription)
        },
        changeTitleActiveTodo(ctx, updateTodo) {
            ctx.commit('changeTitleActiveTodo', updateTodo)
        },
        changeDescriptionActiveTodo(ctx, updatedDescription) {
            ctx.commit('changeDescriptionActiveTodo', updatedDescription)
        },

    },
    state: {
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
    },
    getters: {
        getUserList(state) {
            return state.usersList
        },
        getCurrentUserInfo(state) {
            return state.currentUserInfo
        },
        isAuthCheck(state) {
            return state.isAuth
        },
        getCurrentTodoUser(state) {
            return state.currentUserInfo[0].userTodos.currentTodo
        },
        getExpiredTodoUser(state) {
            return state.currentUserInfo[0].userTodos.expiredTodo
        },
        getCompletedTodoUser(state) {
            return state.currentUserInfo[0].userTodos.completedTodo
        },
        getState(state) {
            return state
        }
    }
}