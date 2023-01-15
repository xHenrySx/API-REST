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
    if (!username || typeof username !== "string") {
        return res.status(400).json({ message: "Username is required and must be string" });
    }
    if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email is required and must be string" });
    }
    if (!password || typeof password !== "string") {
        return res.status(400).json({ message: "Password is required and must be string" });
    }
    next();
}

export const verifySignIn = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email is required and must be string" });
    }
    if (!password || typeof password !== "string") {
        return res.status(400).json({ message: "Password is required and must be string" });
    }
    next();
}

export const verifyRoles = (req, res, next) => {
    if (req.body.roles) {
        const { roles } = req.body; 
        for (const role of roles) {
            if (role !== "admin" && role !== "moderator" && role !== "user") {
                return res.status(400).json({ message: `Role ${role} does not exist. Please check documentation.` });
            }
        }
        // Si hay roles verificar que el usuario que esta creando el usuario sea admin o moderador
        next();
    } else {
        next();
    }
    
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

export const verifyFilter = (req, res, next) => {
    const filter = req.query;
    const availableFilters = ["title", "author", "year", "pages", "description"];
    if (filter) {
        for (const key in filter) {
            if (!availableFilters.includes(key)) {
                return res.status(400).json({ message: `${key} is not a valid filter. Please check the documentation` });
            }
        }
        next();
    } else {
        next();
    }
}


export const verifyOperators = (req, res, next) => {
    if (req.headers.filter) {
        try {
            const filter = req.headers.filter.split(":");

            if (filter.length !== 3) {
                return res.status(400).json({ message: "Bad filter format. Please check the documentation" });
            }

            const operator = filter[1];
            const availableOperators = ["gt", "gte", "lt", "lte", "ne", "substring"];
            if (!availableOperators.includes(operator)) {
                return res.status(400).json({ message: `${operator} is not a valid operator. Please check the documentation` });
            }
            next();
        } catch (error) {
            return res.status(400).json({ message: `Error: ${error}` });
        }
    } else {
        next();
    }
}

export const verifyData = (req, res, next) => {
    if (req.body) {
        const { title, author, year, pages, description, image } = req.body;
        if (!title || typeof title !== "string") {
            return res.status(400).json({ message: "Title is required and must be string" });
        }
        if (!author || typeof author !== "string") {
            return res.status(400).json({ message: "Author is required and must be string" });
        }
        if (!year || typeof year !== "number") {
            return res.status(400).json({ message: "Year is required and must be number" });
        }
        if (!pages || typeof pages !== "number") {
            return res.status(400).json({ message: "Pages is required and must be number" });
        }
        if (!description || typeof description !== "string") {
            return res.status(400).json({ message: "Description is required and must be string" });
        }
        if (!image || typeof image !== "string") {
            return res.status(400).json({ message: "Image is required and must be string" });
        }
        next();
    } else {
        return res.status(400).json({ message: "No data provided" });
    }
}

export const verifyDataPartial = (req, res, next) => {
    if (req.body) {
        const { title, author, year, pages, description, image } = req.body;
        if (title && typeof title !== "string") {
            return res.status(400).json({ message: "Title must be string" });
        }
        if (author && typeof author !== "string") {
            return res.status(400).json({ message: "Author must be string" });
        }
        if (year && typeof year !== "number") {
            return res.status(400).json({ message: "Year must be number" });
        }
        if (pages && typeof pages !== "number") {
            return res.status(400).json({ message: "Pages must be number" });
        }
        if (description && typeof description !== "string") {
            return res.status(400).json({ message: "Description must be string" });
        }
        if (image && typeof image !== "string") {
            return res.status(400).json({ message: "Image must be string" });
        }
        next();
    } else {
        return res.status(400).json({ message: "No data provided" });
    }
}