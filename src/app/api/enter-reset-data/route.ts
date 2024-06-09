import { sendResetPasswordEmail } from "@/helpers/sendResetPasswordEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email } = await request.json();
    const existingUserByEmail = await UserModel.findOne({ email });
    const emailResponse = await sendResetPasswordEmail(email, username);
    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    } else {
      return Response.json(
        {
          success: true,
          message: "Mail send! Please check email!",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Error sending mail to user', error)
        return Response.json({
            success: false, 
            message: "Error sending mail to user"
        },
    {
        status: 500
    })
  }
}
