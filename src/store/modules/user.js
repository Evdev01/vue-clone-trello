export const saveNewUserInList = window.localStorage.getItem('saveNewUserInList')
export const saveCurrentUser = window.localStorage.getItem('saveCurrentUser')
export const isAuthSave = window.localStorage.getItem('isAuthSave')
export const saveBackground = window.localStorage.getItem('saveBackground')

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

            let userLogin = state.usersList.find(user => user.email === checkUser.email)

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

            state.defaultBackground = 'http://st.gde-fon.com/wallpapers_original/657795_punchbowl-falls_columbia-river-gorge_vodopad_reka__1801x1327_www.Gde-Fon.com.jpg'

            this.commit('saveDataUser') // deleting the data of the current user
            this.commit('saveDataUserIsAuth') // remove auth data user
            window.localStorage.setItem('saveBackground', JSON.stringify(state.defaultBackground))

        },
        //    todoAction
        removeTodo(state, index) {

            const currentUserTodosCategories = state.currentUserInfo[0].userTodos

            currentUserTodosCategories.currentTodo.splice(index, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        removeTodoExpired(state, index) {
            state.currentUserInfo[0].userTodos.expiredTodo.splice(index, 1)

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
        removeTodoCompleted(state, index) {
            state.currentUserInfo[0].userTodos.completedTodo.splice(index, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        removeInProgressTodo(state, index) {
            state.currentUserInfo[0].userTodos.inProgressTodo.splice(index, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        removeTodoFromBasket(state, index) {
            state.currentUserInfo[0].userTodos.deletedTodo.splice(index, 1)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
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

            const currentTodo = state.currentUserInfo[0].userTodos.currentTodo
            const inProgressTodo = state.currentUserInfo[0].userTodos.inProgressTodo
            const completedTodo = state.currentUserInfo[0].userTodos.completedTodo

            const allTodos = [...currentTodo, ...inProgressTodo, ...completedTodo]

            console.log(allTodos)

            const findTodoById = allTodos
                .find(todo => todo.id === updateTodo.id)

            findTodoById.title = updateTodo.title


            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList)) // saving a new user to the list || update user data in usersList
        },
        changeDescriptionTodo(state, updatedDescription) {


            const currentTodo = state.currentUserInfo[0].userTodos.currentTodo
            const inProgressTodo = state.currentUserInfo[0].userTodos.inProgressTodo
            const completedTodo = state.currentUserInfo[0].userTodos.completedTodo

            const allTodos = [...currentTodo, ...inProgressTodo, ...completedTodo]

            const findTodoById = allTodos
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
        updateCurrentTodo: (state, payload) => {
            state.currentUserInfo[0].userTodos.currentTodo = payload;
        },
        getDeletedTodos: (state, payload) => {
            state.currentUserInfo[0].userTodos.deletedTodo = payload;
        },
        updateExpiredTodos: (state, payload) => {
            state.currentUserInfo[0].userTodos.expiredTodo = payload;
        },
        todoExpiredInActive: (state, todo) => {

            const findTodo = state.currentUserInfo[0].userTodos.expiredTodo.find(t => t.id === todo.id)
            findTodo.editModeInputDate = false
            findTodo.date = ''

            state.currentUserInfo[0].userTodos.expiredTodo.splice(todo, 1);
            state.currentUserInfo[0].userTodos.currentTodo.unshift(todo)

        },
        updateExpiredTodo: (state, payload) => {
            state.currentUserInfo[0].userTodos.expiredTodo = payload;
        },
        updateCompleteTodo: (state, payload) => {
            state.currentUserInfo[0].userTodos.completedTodo = payload;
        },
        updateInProgressTodo: (state, payload) => {
            state.currentUserInfo[0].userTodos.inProgressTodo = payload;
        },
        updateLocalList(state) {
            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        editModeSateDateAction(state, todo) {

            const findTodo = state.currentUserInfo[0].userTodos.currentTodo.find(t => t.id === todo.id)

            findTodo.editModeInputDate = true

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        editModeSateDateInProgressTodo(state, todo) {

            const findTodo = state.currentUserInfo[0].userTodos.inProgressTodo.find(t => t.id === todo.id)

            findTodo.editModeInputDate = true

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        resetDateSetting(state, todo) {

            const findTodo = state.currentUserInfo[0].userTodos.currentTodo.find(t => t.id === todo.id)


            findTodo.isDateSet = false
            findTodo.date = ''

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        resetDateSettingInProgressTodo(state, todo) {

            const findTodo = state.currentUserInfo[0].userTodos.inProgressTodo.find(t => t.id === todo.id)


            findTodo.isDateSet = false
            findTodo.date = ''

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        offEditModeSateDateAction(state, id) {

            const findTodo = state.currentUserInfo[0].userTodos.currentTodo.find(t => t.id === id)

            findTodo.editModeInputDate = false

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        offEditModeSateDateActionInProgressTodo(state, id) {

            const findTodo = state.currentUserInfo[0].userTodos.inProgressTodo.find(t => t.id === id)

            findTodo.editModeInputDate = false

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        openSearchTodoInput(state) {

            state.currentUserInfo[0].openSearchTodoInput = !state.currentUserInfo[0].openSearchTodoInput

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        updateInfoUser(state, newInfo) {

            const findUser = state.currentUserInfo[0]

            findUser.locale = newInfo.locale

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        todoInBasket(state, {id}) {

            const copyStateCurrentTodos = [...state.currentUserInfo[0].userTodos.currentTodo]
            const findElem = copyStateCurrentTodos.findIndex(el => el.id === id)
            copyStateCurrentTodos.splice(findElem, 1)
            state.currentUserInfo[0].userTodos.currentTodo = copyStateCurrentTodos


            const copyStateDeletedTodos = [...state.currentUserInfo[0].userTodos.deletedTodo]
            copyStateDeletedTodos.unshift(findElem)
            state.currentUserInfo[0].userTodos.deletedTodo = copyStateDeletedTodos


            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        deletePermanently(state, {id}) {


            const copyStateCurrentTodo = [...state.currentUserInfo[0].userTodos.currentTodo]

            const findElem = copyStateCurrentTodo.findIndex(el => el.id === id)

            copyStateCurrentTodo.splice(findElem, 1)

            state.currentUserInfo[0].userTodos.currentTodo = copyStateCurrentTodo

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        returnTodoInActive(state, todo) {


            state.currentUserInfo[0].userTodos.deletedTodo.splice(todo, 1)
            state.currentUserInfo[0].userTodos.currentTodo.unshift(todo)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        selectNewBackground(state, img) {

            const findImg = state.galleryBackground.find(i => i.id === img.id)

            state.defaultBackground = ''
            state.currentUserInfo[0].background = findImg.url

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
            window.localStorage.setItem('saveBackground', JSON.stringify(state.defaultBackground))
        },
        resetBackground(state) {

            const findCurrentPerson = state.currentUserInfo[0]

            findCurrentPerson.background = ''

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
        },
        resetDefaultBackground(state) {

            state.defaultBackground = ''

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))
            window.localStorage.setItem('saveBackground', JSON.stringify(state.defaultBackground))
        },
        addNewCheckBox(state, newCheckBox) {

            state.currentUserInfo[0].checkBoxList.unshift(newCheckBox)

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))

        },
        changeStateInput(state, elem) {


            const idx = state.currentUserInfo[0].checkBoxList.findIndex(el => el.id === elem.id)

            state.currentUserInfo[0].checkBoxList[idx].checkBoxComplete = !state.currentUserInfo[0].checkBoxList[idx].checkBoxComplete

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))

        },

        removeCheckBox(state, {id}) {

            const copyStateCheckBoxList = [...state.currentUserInfo[0].checkBoxList]

            const findElem = copyStateCheckBoxList.findIndex(el => el.id === id)

            copyStateCheckBoxList.splice(findElem, 1)

            state.currentUserInfo[0].checkBoxList = copyStateCheckBoxList

            window.localStorage.setItem('saveCurrentUser', JSON.stringify(state.currentUserInfo)) // saving info current user data || update user data
            window.localStorage.setItem('saveNewUserInList', JSON.stringify(state.usersList))

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
        removeInProgressTodo(ctx, index) {
            ctx.commit('removeInProgressTodo', index)
        },
        removeTodoFromBasket(ctx, index) {
            ctx.commit('removeTodoFromBasket', index)
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
        editModeSateDateAction(ctx, todo) {
            ctx.commit('editModeSateDateAction', todo)
        },
        editModeSateDateInProgressTodo(ctx, todo) {
            ctx.commit('editModeSateDateInProgressTodo', todo)
        },
        offEditModeSateDateAction(ctx, id) {
            ctx.commit('offEditModeSateDateAction', id)
        },
        offEditModeSateDateActionInProgressTodo(ctx, id) {
            ctx.commit('offEditModeSateDateActionInProgressTodo', id)
        },
        updateCurrentTodo: ({commit}, payload) => {
            commit("updateCurrentTodo", payload);
        },
        updateExpiredTodo: ({commit}, payload) => {
            commit("updateExpiredTodo", payload);
        },
        updateCompleteTodo: ({commit}, payload) => {
            commit("updateCompleteTodo", payload);
        },
        updateInProgressTodo: ({commit}, payload) => {
            commit("updateInProgressTodo", payload);
        },
        updateLocalList: ({commit}, payload) => {
            commit("updateLocalList", payload);
        },
        openSearchTodoInput: ({commit}) => {
            commit("openSearchTodoInput");
        },
        updateInfoUser: ({commit}, newInfo) => {
            commit("updateInfoUser", newInfo);
        },
        resetDateSetting: ({commit}, todo) => {
            commit("resetDateSetting", todo);
        },
        resetDateSettingInProgressTodo: ({commit}, todo) => {
            commit("resetDateSettingInProgressTodo", todo);
        },
        getDeletedTodos: ({commit}, todo) => {
            commit("getDeletedTodos", todo);
        },
        updateExpiredTodos: ({commit}, todo) => {
            commit("updateExpiredTodos", todo);
        },
        returnTodoInActive: ({commit}, todo) => {
            commit("returnTodoInActive", todo);
        },
        todoInBasket: ({commit}, todo) => {
            commit("todoInBasket", todo);
        },
        deletePermanently: ({commit}, todo) => {
            commit("deletePermanently", todo);
        },
        selectNewBackground: ({commit}, img) => {
            commit("selectNewBackground", img);
        },
        resetBackground: ({commit}) => {
            commit("resetBackground");
        },
        resetDefaultBackground: ({commit}) => {
            commit("resetDefaultBackground");
        },
        addNewCheckBox: ({commit}, newCheckBox) => {
            commit("addNewCheckBox", newCheckBox);
        },
        changeStateInput: ({commit}, elem) => {
            commit("changeStateInput", elem);
        },
        removeCheckBox: ({commit}, elem) => {
            commit("removeCheckBox", elem);
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
        currentUserInfo: saveCurrentUser ? JSON.parse(saveCurrentUser) : [],
        galleryBackground: [
            {
                id: 1,
                url: 'http://st.gde-fon.com/wallpapers_original/658579_meduza_meduzyi_podvodnyiy-mir_voda_more_okean_obit_6000x4000_www.Gde-Fon.com.jpg'
            },
            {
                id: 2,
                url: 'http://st.gde-fon.com/wallpapers_original/652426_zima_priroda_derevya_sneg_nebo_2950x2094_www.Gde-Fon.com.jpg'
            },
            {
                id: 3,
                url: 'http://st.gde-fon.com/wallpapers_original/652424_zima_priroda_derevya_sneg_les_2950x2094_www.Gde-Fon.com.jpg'
            },
            {
                id: 4,
                url: 'http://st.gde-fon.com/wallpapers_original/652428_zima_priroda_derevya_sneg_nebo_les_goryi_2950x2094_www.Gde-Fon.com.jpg'
            },
            {
                id: 5,
                url: 'http://st.gde-fon.com/wallpapers_original/657791_zakat_nebo_derevya_priroda_4928x3264_www.Gde-Fon.com.jpg'
            },
            {
                id: 6,
                url: 'http://st.gde-fon.com/wallpapers_original/657795_punchbowl-falls_columbia-river-gorge_vodopad_reka__1801x1327_www.Gde-Fon.com.jpg'
            }
        ],
        defaultBackground: saveBackground ? JSON.parse(saveBackground) :
            'http://st.gde-fon.com/wallpapers_original/657795_punchbowl-falls_columbia-river-gorge_vodopad_reka__1801x1327_www.Gde-Fon.com.jpg'
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
        getDeletedTodoUser(state) {
            return state.currentUserInfo[0].userTodos.deletedTodo
        },
        getExpiredTodoUser(state) {
            return state.currentUserInfo[0].userTodos.expiredTodo
        },
        getCompletedTodoUser(state) {
            return state.currentUserInfo[0].userTodos.completedTodo
        },
        getInProgressTodoUser(state) {
            return state.currentUserInfo[0].userTodos.inProgressTodo
        },
        isSearchTodoInputOpen(state) {
            return state.currentUserInfo[0].openSearchTodoInput
        },
        getLocaleUser(state) {
            return state.currentUserInfo[0].locale
        },
        getGalleryBackgroundImg(state) {
            return state.galleryBackground
        },
        getDefaultBackground(state) {
            return state.defaultBackground
        },
        getCurrentUserCheckBoxList(state) {
            return state.currentUserInfo[0].checkBoxList
        },
        getCurrentUserCheckBoxLength(state) {
            return state.currentUserInfo[0].checkBoxList.length
        },
        getCurrentUserCheckBoxLengthCompleted(state) {
            return state.currentUserInfo[0].checkBoxList.filter(el => el.checkBoxComplete).length
        }
    }
}