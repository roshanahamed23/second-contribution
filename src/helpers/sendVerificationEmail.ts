import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/VerficationEmail";
import { apiResponses } from "@/types/apiResponses";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<apiResponses>{
     try {
        console.log(verifyCode)
        await resend.emails.send({
            from:"onboarding@resend.dev",
            to:email,
            subject:"Feedbacks Anonymous Verification Code",
            react:VerificationEmail({username,otp:verifyCode})
        });
        return {success:true, message:'Sent verification email successfully'}
     } catch (emailError) {
        console.error("Error sending verification email!", emailError)
        return {success:false, message:'Failed to send verification email'}
     }
}