
import {z} from "zod"

export const usernameValidation = z
.string()
.max(20,"username must be not more than 20 charachters" )
.max(20,"username must be atleast two 2 charachters" )
.regex(/^[a-zA-Z0-9]+$/, "Username must not contain any special Character")


export const signUpSchema = z.object({
    usename: usernameValidation,
    email: z.string().email({message: "Invalid e-mail address"}),
    password: z.string().min(8, "password must be atleast 8 characters")
})
