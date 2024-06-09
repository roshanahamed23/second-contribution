import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signupSchema";

//creating a query schema
const { email: emailSchema } = signUpSchema.shape;

// Define a schema for the query parameter using the extracted email schema
const UsernameQuerySchema = z.object({
  email: emailSchema,
});

export async function GET(request: Request) {
  //TODO use this in all other routes
  if (request.method !== "GET") {
    return Response.json(
      {
        success: false,
        message: "Method not allowed!",
      },
      { status: 405 }
    );
  }
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      email: searchParams.get("email"),
    };
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const emailErrors = result.error.format().email?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            emailErrors?.length > 0
              ? emailErrors.join(", ")
              : "Invalid query parameters",
        },
        {
          status: 400,
        }
      );
    }
    const { email } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      email,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Email already taken!",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Email available!",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error checking email", error);
    return Response.json(
      {
        success: false,
        message: "Error checking email!",
      },
      {
        status: 500,
      }
    );
  }
}
