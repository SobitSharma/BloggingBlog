import bcrypt from "bcrypt"
const saltRounds = 10

const EncryptPassword = async(myPlainPassword) => {
    try {
        return await bcrypt.hash(myPlainPassword, saltRounds)
    } catch (error) {
        console.log("Error in Encrypting the Password", error.message)
        return false
    }
}

const DecryptPassword = async(PlainPassword, encryptedPassword) => {
    console.log(PlainPassword, encryptedPassword)
    return await bcrypt.compare(PlainPassword, encryptedPassword)
}

export {EncryptPassword, DecryptPassword}