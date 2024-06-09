"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { apiResponses } from "@/types/apiResponses";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { acceptDataSchema } from "@/schemas/acceptDataSchema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

const GetResetData = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof acceptDataSchema>>({
    resolver: zodResolver(acceptDataSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof acceptDataSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<apiResponses>(
        "/api/enter-reset-data",
        data
      );
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/sign-in`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in collecting data", error);
      const axiosError = error as AxiosError<apiResponses>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Data collection Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Enter details for password reset
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Send Reset Mail"
            )}
          </Button>
        </form>
      </Form>
    </div>
    </div>
  );
};

export default GetResetData;
