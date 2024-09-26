import jwt from "jsonwebtoken"

const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, process.env.SECRETKEY || "ABCDGD%TCFSHJ", {expiresIn:'1d'})
        return token
    } catch (error) {
        console.log(`Error Ocuured in Generating the JWT Token ${error.message}`)
        return false
    }
}

export {generateToken}