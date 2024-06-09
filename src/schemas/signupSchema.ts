import { z } from "zod"

export const usernameValidation = z.string()
                                   .min(2,"Username must be at least 2 characters")
                                   .max(10, "Username must be within 10 characters at maximum")
                                   .regex(/^[a-zA-Z0-9_]+$/, "Username must not have special character")
export const signUpSchema = z.object({
    username: usernameValidation, 
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(2,{message:"Password must be at least 6 characters"})
})
