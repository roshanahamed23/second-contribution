import {resend} from "@/lib/resend";
import ResetPasswordEmail from "../../emails/ResetPasswordEmail";
import { apiResponses } from "@/types/apiResponses";

export async function sendResetPasswordEmail(
    email: string,
    username: string
): Promise<apiResponses>{
     try {
        await resend.emails.send({
            from:"onboarding@resend.dev",
            to:email,
            subject:"Feedbacks Anonymous Verification Code",
            react:ResetPasswordEmail({username})
        });
        return {success:true, message:'Sent reset password email successfully'}
     } catch (emailError) {
        console.error("Error sending reset password email!", emailError)
        return {success:false, message:'Failed to send password reset email'}
     }
}