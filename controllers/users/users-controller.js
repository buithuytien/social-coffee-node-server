import * as usersDao from "./users-dao.js";
import bcrypt from 'bcrypt'

const salt = 10

let currentUser = null

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
    app.post('/api/users/profile', profile)
}

const register = async (req, res) => {
    const user = req.body;
    const password = user.password;

    user.password = await bcrypt.hash(password, salt);

    const existingUser = await usersDao.findUserByUsername(user.userName)

    console.log(existingUser)

    if(!existingUser) {
        const currentUser = await usersDao.createUser(user)
        currentUser.password = '*****'
        req.session['currentUser'] = currentUser
        console.log('users-controller register, session info')
        console.log(req.session)
        res.json(currentUser)
        return
    }
    res.sendStatus(403)
}

const login = async (req, res) => {
    const credentials = req.body
    const password = credentials.password;

    const existingUser = await usersDao.findUserByUsername(credentials.userName)

    if (existingUser) {
        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
            // access session from here
            existingUser.password = '*****'
            req.session['currentUser'] = existingUser
            // console.log('users-controller login, session info')
            // console.log(req.session)
            currentUser = existingUser
            res.json(existingUser)
            return
        }
    }
    res.sendStatus(403)
}

const logout = (req, res) => {
    console.log("logout from user controller node, print session");
    console.log("session before logout", req.session);

    currentUser = null
    req.session.destroy()
    res.sendStatus(200)
}

const profile = async (req, res) => {
    console.log("profile from user controller node, print session");
    console.log("session when profile", req.session);
    if (currentUser) {
        res.json(currentUser)
        return
    }
    res.sendStatus(403)
}


const findUserById = async (req, res) => {
    console.log("from user controller, session when find user by id", req.session);

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
    const uid = req.body._id
    const updates = req.body
    console.log(uid, updates)

    const status = await usersDao.updateUser(uid, updates)

    const user = await usersDao.findUserById(uid)

    user.password = '*****'
    req.session['currentUser'] = user

    currentUser = user

    console.log(req.session['currentUser'])

    res.json(user)
}

export default UsersController