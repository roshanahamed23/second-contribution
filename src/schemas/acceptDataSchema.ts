import {z} from "zod"
export const acceptDataSchema=z.object({
   username: z.string(),
   email: z.string(),
})