import User from "../Models/User.model.js";
import Role from "../Models/Role.model.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";


export const signup = async (req, res) => {

    const { username, email, password, roles } = req.body;
    

    const newUser = new User({
        username: username,
        email: email,
        password: await User.encryptPassword(password)
    });

    if ( roles ) {

        // Buscamos los roles que coincidan con los roles que nos llegan
        const foundRoles = await Role.find({ name: { $in: roles } });

        // Asignamos los roles al usuario
        newUser.roles = foundRoles.map((role) => {
            return role._id;
        });
    } else {

        // Si no nos llegan roles, asignamos el rol de usuario
        const role = Role.findOne({ name: "user" });
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save().catch(err => {
        return res.status(500).json({ message: err });
    });
    
    try {
        jwt.sign({ id: savedUser._id }, SECRET,{
            expiresIn: 86400 // 24 horas
        }, (err, token) => {
            if (err) {
                console.log(err);
            } else {
                return res.status(200).json({ token, user: savedUser
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

    const token = jwt.sign({ id: user._id }, SECRET,
        {
            expiresIn: 86400 // 24 horas
        }
    );

    res.json({ token, user: user });
};

