import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  await dbConnect();
  try {
    const {username, password} = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const newpassword = await bcrypt.hash(password, 10);
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $set: { password: newpassword }  }
    );
    if (updateResult.modifiedCount === 0) {
      return Response.json({
        message: "Error in password modification",
        success: false,
      });
    }
    return Response.json(
      { message: "Password Reset successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return Response.json(
      { message: "Error resetting password", success: false },
      { status: 500 }
    );
  }
}
