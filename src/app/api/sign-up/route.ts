import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import exp from "constants";

export async function POST(request:Request)
{
    await dbConnect()
    try {
        const {username, email, password}=await request.json()
        const existingUserVerifiedByUsername=await UserModel.findOne({
            username, 
            isVerified: true
        })
        if(existingUserVerifiedByUsername)
        {
            return Response.json({success:false, message: "Username is already taken"},{status:400})
        }
        else
        {
            const existingUserByEmail=await UserModel.findOne({email})
            const verifyCode = Math.floor(100000+Math.random()*900000).toString()
            if(existingUserByEmail)
                {
                    if(existingUserByEmail.isVerified)
                        return Response.json({success:false, message: "User already exists with this email"},{status:400})
                    else
                      {
                        const hashed_password = await bcrypt.hash(password, 10);
                        existingUserByEmail.password = hashed_password
                        existingUserByEmail.verifyCode = verifyCode
                        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                        await existingUserByEmail.save()    
                    }
                }
            else
            {
                const hashed_password = await bcrypt.hash(password, 10)
                const expiryDate = new Date()
                expiryDate.setHours(expiryDate.getHours()+1);
                const newuser = new UserModel({
                    username,
                    email,
                    password: hashed_password,
                    verifyCode,
                    verifyCodeExpiry: expiryDate,
                    isVerified:false,
                    isAcceptingMessage:true,
                    messages: []
                })
                await newuser.save()
            }

            const emailResponse = await sendVerificationEmail(email, username, verifyCode)
            if(!emailResponse.success)
                  {
                    return Response.json({success:false, message: emailResponse.message},{status:500})
                  }
            else
            {
                return Response.json({success:true, message:"Registeration successfull! Please verify email!"},{status:201})
            }
        }
    } catch (error) {
        console.error('Error registering user', error)
        return Response.json({
            success: false, 
            message: "Error registering user"
        },
    {
        status: 500
    })
    }
}