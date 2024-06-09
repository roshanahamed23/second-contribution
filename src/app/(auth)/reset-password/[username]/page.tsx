"use client"
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { resetPasswordSchema } from "@/schemas/resetPasswordScehma";
import { apiResponses } from "@/types/apiResponses";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ResetPassword = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues:
    {
      password:''
    }
  });
  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      const response = await axios.post(`/api/reset-password`, {
        username: param.username,
        password: data.password
      });
      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace(`/sign-in`);
    } catch (error) {
      console.error("Error in changing password of user", error);
      const axiosError = error as AxiosError<apiResponses>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Reset Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Reset Password
        </h1>
        <p className="mb-4">Enter the new password</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Reset</Button>
        </form>
      </Form>
    </div>
  </div>
  );
};

export default ResetPassword;
