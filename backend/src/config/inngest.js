import { Inngest } from "inngest";
import  { connectDB } from "./db.js"
import { User } from "../models/user.model.js";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone" });

export const syncUser = inngest.createFunction(
    {id: "sync-user"},
    {event: "clerk/user.created"},
    async ({event}) => {
       await connectDB();
       
       const {id, email_adresses, first_name, last_name, image_url} = event.data
       const newUser = {
        clerkId: id,
        email: email_adresses,
        name: `${first_name || ""} ${last_name || ""}`,
        image: image_url,

       }
       await User.create(newUser);
});

export const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-DB"},
    {event: "clerk/user.deleted"},
    async ({event}) => {
       await connectDB();
       
       const { id } = event.data
       await User.deleteOne(newUser);
    }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];