import usersModel from "./users-model.js";

export const findUsers = () => usersModel.find();
export const findUserById = (uid) =>
    usersModel.findById(uid, {password: false})
export const findUserByUsername = (username) =>
    usersModel.findOne({userName: username})
export const findUserByCredentials = async (username, password) =>
    await usersModel.findOne({userName: username, password: password})
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (uid) => usersModel.deleteOne({_id: uid});
export const updateUser = (uid, userUpdates) => usersModel.updateOne({_id: uid},  {$set: userUpdates})