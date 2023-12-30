const User = require('../models/user')
const { StatusCodes } = require("http-status-codes");

//register function with mongoose  
const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token: '123456' });

}

module.exports = {register}