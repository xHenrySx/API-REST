export const createUser = async (req, res) => {
    const { username, email, password, roles } = req.body;
    const newUser = new User({
        username: username,
        email: email,
        password: await User.encryptPassword(password)
    });
}

export const getUserById = async (req, res) => {

}

export const getUsers = async (req, res) => {

}

export const updateUserById = async (req, res) => {

}

export const updateUserPartiallyById = async (req, res) => {

}

export const deleteUserById = async (req, res) => {

}
