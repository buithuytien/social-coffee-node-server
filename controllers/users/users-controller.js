import * as usersDao from  "./users-dao.js";
// import {createUser, deleteUser, findUsers, updateUser} from "./users-dao.js";

const UsersController = (app) =>{
    app.post('/api/users', createUser);
    app.get('/api/users', findUsers);
    app.get('/api/users/:uid', findUserByUserName);
    app.put('/api/users/:uid', updateUser);
    app.delete('/api/users/:uid', deleteUser);
}

const findUserByUserName = async (req, res) => {
    const userName = req.params.uid;
    const user = await usersDao.findByUsername(userName);
    res.json(user)
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