import * as usersDao from  "./users-dao.js";
// import {createUser, deleteUser, findUsers, updateUser} from "./users-dao.js";

const UsersController = (app) =>{
    app.post('/api/users', createUser);
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserById);
    app.put('/api/users/:uid', updateUser);
    app.delete('/api/users/:uid', deleteUser);

    app.post('/api/users/register', register)
    app.post('/api/users/login', login)
    app.post('/api/users/logout', logout)
}

const register = async (req, res) => {
    const user = req.body;
    const existingUser = await usersDao.findUserByUsername(user.username)
    if(existingUser) {
        res.sendStatus(403)
        return
    }
    const currentUser = await usersDao.createUser(user)
    req.session['currentUser'] = currentUser
    res.json(currentUser)
}

const login = async (req, res) => {
    const credentials = req.body
    const existingUser = await usersDao.findUserByCredentials(
            credentials.userName, credentials.password)
    // const existingUser = await usersDao.findUserByUsername(credentials.userName)
    console.log(existingUser)
    if(existingUser) {
        // access session from here
        req.session['currentUser'] = existingUser
        console.log('users-controller login, session info')
        console.log(req.session)
        res.json(existingUser)
        return
    }
    res.sendStatus(403)
}

const logout = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
}


const findUserById = async (req, res) => {
    const uid = req.params.uid
    const user = await usersDao.findUserById(uid)
    if (user) {
        res.json(user)
        return
    }
    res.sendStatus(404)
}

const findUsers = async (req, res) => {
    const users = await usersDao.findUsers();
    res.json(users)
}

const createUser = async (req, res) => {
    const newUser = req.body;
    const insertedUser = await usersDao.createUser(newUser);
    res.json(insertedUser)
}

const deleteUser = async (req, res) => {
    const userIdToDelete = req.params.uid;
    const status = await usersDao.deleteUser(userIdToDelete);
    res.json(status)
}

const updateUser = async (req, res) => {
    const uid = req.params.uid
    const updates = req.body
    console.log(uid, updates)
    const status = await usersDao.updateUser(uid, updates)
    res.json(status)
}

export default UsersController