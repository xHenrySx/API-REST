import User from "../../Models/User.model.js";
import Role from "../../Models/Role.model.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config.js";

// Crea un usuario nuevo (solo para admins) -> POST
export const createUser = async (req, res) => {
    const { username, email, password, roles } = req.body;
    const newUser = new User({
        username: username,
        email: email,
        password: await User.encryptPassword(password)
    });

    if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map(role => role._id);
    }
    else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    if (!savedUser) {
        return res.status(500).json({ message: "Error while creating the user. Try again" });
    }

    // Si el usuario es admin, no se le asigna un token de expiración
    if (roles.include("admin")) {
        const token = jwt.sign({ id: savedUser._id }, config.SECRET);

        return res.status(200).json({
        token,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles 
        });
    }

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 // 24 horas
    });

    return res.status(200).json({ 
    token,
    username: savedUser.username,
    email: savedUser.email,
    roles: savedUser.roles});
}

// Obtiene el usuario con Id (solo para admins y moderadores) -> GET
export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId).populate("roles");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
}

// Obtiene todos los usuarios (solo para admins y moderadores) -> GET
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("roles");

        if (!users) {
            return res.status(404).json({ message: "Users not found" });
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error while getting the users. Try again" });
    }
    
}

// Actualiza el usuario con Id (solo para admins) -> PUT
export const updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch {
        return res.status(500).json({ message: "Error while updating the user. Try again" });
    }
    
}

// Actualiza parcialmente el usuario con Id (solo para admins) -> PATCH
export const updateUserPartiallyById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error while  partially updating the user. Try again" });
    }
}

// Elimina el usuario con Id (solo para admins) -> DELETE
export const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error while deleting the user. Try again" });
    }
}
