import {Schema, model, mongoose} from "mongoose"

const userSchemaWithUserNameAndPassword = new Schema({
    username : {
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Content'
        }
    ],
}, {timestamps:true})

export const userwithUsernameandpassword = model('userwithusername', userSchemaWithUserNameAndPassword);


const userSchemaForGmailLogin = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Content'
        }
    ],
}, {timestamps:true})

export const userwithgmail = model('userwithgmail', userSchemaForGmailLogin);
