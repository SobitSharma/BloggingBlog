import mongoose from "mongoose";

const connection = async() => {
    try {
        await mongoose.connect(process.env.DBURL, {dbName:process.env.DBNAME})
        return true
    } catch (error) {
        console.log("Error in Connection the DataBase ", error.message)
        return false
    }
}

export default connection