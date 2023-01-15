import User from "../Models/User.model.js";
import Role from "../Models/Role.model.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";


export const signup = async (req, res) => {

    const { username, email, password} = req.body;
    

    const newUser = new User({
        username: username,
        email: email,
        password: await User.encryptPassword(password)
    });

    // Agregamos el rol de user
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id]

    const savedUser = await newUser.save().catch(err => {
        return res.status(500).json({ message: err });
    });
    
    try {
        jwt.sign({ id: savedUser._id },
            {
                expiresIn: 86400 // 24 horas
            },
            SECRET, (err, token) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(200).json({ token,
                username: savedUser.username,
                email: savedUser.email,
                roles: savedUser.roles
                });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
    


};

export const signin = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({email}).populate("roles");

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const password = await User.comparePassword(req.body.password, user.password);

    // Si la contraseña no coincide
    if (!password) {
        return res.status(401).json({ token: null, message: "Invalid password" });
    }
    const roles = await Role.find({ _id: { $in: user.roles } });

    // Generamos el token si el rol es user
    if (roles[0].name === "user") {
        const token = jwt.sign({ id: user._id }, SECRET,
            {
                expiresIn: 86400 // 24 horas
            }
        );
        return res.json({ token,
        username: user.username,
        email: user.email,
        roles: user.roles });
    }

    // El token no expira si el rol es admin o moderator
    if (roles[0].name === "admin" || roles[0].name === "moderator") {
        const token = jwt.sign({ id: user._id }, SECRET);
        return res.json({ token, user: user });
    }
};

