import { DecryptPassword, EncryptPassword } from "../DataEncryption/Password.encrypt.js"
import { userwithUsernameandpassword, userwithgmail } from "../models/user.model.js"
import { generateToken } from "../TokenHandling/JWTTokens.js"

const SignUpWithUserNameAndPassword = async(req, res) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({
                status:400,
                Data:null,
                message:"Request Contains Null Values"
            })
        }
        if(!(username.length>5) || !(password.length>5) || password.length>20 || username.length>20){
            return res.status(400).json({
                status:400,
                Data:null,
                message:"The UserName And Password length should be in between 5<[Length of your attribute]<20"
            })
        }
        const user = await userwithUsernameandpassword.findOne({username});
        if(user){
            console.log(user)
            return res.status(400).json({
                status:400,
                Data:null,
                message:"User with This UserName Already Exists"
            })
        }
        const encryptedPassword = await EncryptPassword(password)
        console.log("This is Ency[", encryptedPassword)
        if(!encryptedPassword){
            return res.status(500).json({
                status:400,
                Data:null,
                message:"Internal Server Error"
            })
        }
    
        const userSigningUp = await userwithUsernameandpassword({username, password:encryptedPassword});
        await userSigningUp.save()
        const token = generateToken({username, id:userSigningUp._id});
        res.cookie('token', token)
    
        res.status(200).json({
            status:200,
            message:"Sign Up SucessFull",
            data:null
        })
    } catch (error) {
        console.log("Error in SignUp Controller", error.message)
        res.status(200).json({
            status:500,
            message:"Internal Error Occurred While Signing Up",
            data:null
        })
    }
}

const LoginWithUserNameAndPassword = async(req, res) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({
                status:400,
                Data:null,
                message:"Request Contains Null Values"
            })
        }
        const checkingIfUserExists = await userwithUsernameandpassword.findOne({username});
        if(!checkingIfUserExists){
            return res.status(400).json({
                status:400,
                message:"User Doesnot Exists",
                data:null
            })
        }
        const matchingThePassword = await DecryptPassword(password, checkingIfUserExists.password);
        console.log(matchingThePassword)
        if(!matchingThePassword){
            return res.status(400).json({
                status:400,
                message:"Incorrect Password",
                data:null
            })
        }
        const token = generateToken({
            username:checkingIfUserExists.username,
            id : checkingIfUserExists._id
        })
        res.cookie('token', token);
        res.status(200).json({
            message:"Login SucessFull",
            status:200
        })
    } catch (error) {
        console.log("Internal Error Occurred ", error.message);
        res.status(500).json({
            message:"Internal Error Occurred",
            status:500,
            data:null
        })
    }
}

const SignInWithGmail = async(req, res) => {
    try {
        const {username, email} = req.body
        if(!username || !email){
            return res.status(400).json({
                status:400,
                Data:null,
                message:"Request Contains Null Values"
            })
        }
        let SignInUserWithGmail = await userwithgmail.findOne({email});
        if(!SignInUserWithGmail){
            SignInUserWithGmail = await userwithgmail({
                username,
                email
            })
            await SignInUserWithGmail.save()
        }
        const token = generateToken({username, id:SignInUserWithGmail._id});
        res.cookie("token", token)
        res.status(200).json({
            status:200,
            message:"Sign In With Gmail SuccessFull"
        })
    } catch (error) {
        console.log("Error in Sign In with gmail Controller", error.message)
        res.status(500).json({
            message:"Internal Server Error Occurred",
            status:500
        })
    }
}

export {
    SignUpWithUserNameAndPassword,
    LoginWithUserNameAndPassword,
    SignInWithGmail
}