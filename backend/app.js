import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import connection from "./DB/Connection.db.js"
import { LoginWithUserNameAndPassword, SignUpWithUserNameAndPassword , SignInWithGmail} from "./controllers/user.controller.js"

const app = express()
app.use(cookieparser());
dotenv.configDotenv()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connection().then((res)=>{
    if(res){
        console.log("DataBase is Connected !! ");
        app.post('/auth/first/signup', SignUpWithUserNameAndPassword)
        app.post('/auth/first/signin',LoginWithUserNameAndPassword)
        app.post("/auth/second/signin", SignInWithGmail)
        app.listen(process.env.PORT || 3000, ()=>console.log("The Server has Started "))
    }
})


