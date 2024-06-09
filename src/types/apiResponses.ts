import { Message } from "@/model/User";
export interface apiResponses {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?:Array<Message>
}