import User from "../Models/User.model.js";
import Role from "../Models/Role.model.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const verifyToken = async (req, res, next) => {
    try {

        const token = req.headers["access-token"];
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, SECRET);

        const user = await User.findById
        (decoded.id, { password: 0 });
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
        if (role.name === "moderator") {
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