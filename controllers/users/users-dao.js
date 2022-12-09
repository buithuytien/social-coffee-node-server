import usersModel from "./users-model.js";

export const findUsers = () => usersModel.find();
export const findByUsername = (username) =>
    usersModel.findOne({username})
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (uid) => usersModel.deleteOne({_id: uid});
export const updateUser = (uid, userUpdates) => usersModel.updateOne({_id: uid},  {$set: userUpdates})