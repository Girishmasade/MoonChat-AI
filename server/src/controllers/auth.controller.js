import User from "../models/user.models.js";
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body
        if (!username || !email || !password) {
            return res.status(400).json({message: "All Fields required"})
        }

        const existingUser = await User.findOne({email}) 

        if (existingUser) {
            return res.status(400).json({message: "User Not Exisits"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);

        const newUser = {
            username,
            email,
            password: hashedPassword
        }

        await newUser.save
        console.log(newUser);
        
        return res.status(200).json({newUser, message: "User Registered SuccessFully"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const updateUserDetails = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const getUserDetails = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const getUsers = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const forgetPassword = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteUser = async (reqq, res) => {
    try {
        
    } catch (error) {
        
    }
}