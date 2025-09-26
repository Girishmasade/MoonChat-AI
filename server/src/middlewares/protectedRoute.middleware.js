import jwt from 'jsonwebtoken'

export const protectedRoute = async (err, req, res, next) => {
    try {
        const authHeaders = req.headers.authorization 

        if (!authHeaders || !authHeaders.startswith("Bearer")) 
        return res.status(401).json({message: "Unauthorized access"})

        const token = authHeaders.split(" ")[1]

        if (!token)
        return res.status(401).json({message: "Unauthorized access"})

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode._id

        next()

    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}