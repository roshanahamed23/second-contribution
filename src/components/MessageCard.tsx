import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import dayjs from 'dayjs';
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "./ui/use-toast";
import axios, { AxiosError } from "axios";
import { apiResponses } from "@/types/apiResponses";

type MessageCardProps = {
    message: Message;
    onMessageDelete:(messageId:string)=> void 
}
const MessageCard = ({message, onMessageDelete}: MessageCardProps) => {
    const {toast} = useToast()
    const handleDeleteConfirm = async()=>
        {
            try {
                const response = await axios.delete<apiResponses>(`/api/delete-message/${message._id}`);
                toast({
                    title: response.data.message,
                    description:"Message deleted!",
                    variant:"default"
                  });
                onMessageDelete(message.id);
            } catch (error) {
              const axiosError = error as AxiosError<apiResponses>;
              let errorMessage = axiosError.response?.data.message;
              toast({
                title: "Deletion error",
                description: errorMessage,
                variant: "destructive",
              });
            }
           
        }
  return (
    <Card>
      <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>{message.content}</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive"><X className="w-5 h-5"/></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
        <div className="text-sm">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
