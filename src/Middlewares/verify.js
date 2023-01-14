import User from "../Models/User.model.js";
import Role from "../Models/Role.model.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const verifyToken = async (req, res, next) => {
    try {

        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.id;

        const user = await User.findById(
            req.userId,
            { password: 0 });
        
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (const role of roles) {
        if (role.name === "moderator" || role.name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (const role of roles) {
        if (role.name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Require Admin Role!" });
};

export const verifySignUp = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    next();
}

export const verifySignIn = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    next();
}

export const verifyRoles = (req, res, next) => {
    const { roles } = req.body; 
    for (const role of roles) {
        if (role !== "admin" && role !== "moderator" && role !== "user") {
            return res.status(400).json({ message: `Role ${role} does not exist. Please check documentation.` });
        }
    }
    // Si hay roles verificar que el usuario que esta creando el usuario sea admin o moderador
    next();
}


export const verifyDuplicated = async (req, res, next) => {
    const { username, email } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        return res.status(400).json({ message: "Username already exists"});
    }
    const userEmail = await User.findOne({ email });
    if (userEmail) {
        return res.status(400).json({ message: "Email already exists" + userEmail});
    }

    next();
}