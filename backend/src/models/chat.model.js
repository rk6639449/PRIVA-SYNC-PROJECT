
import mongoose,{Schema} from "mongoose";

const chatSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    message:String,
    response:String

},{timestamps:true});

export const Chat = mongoose.model("Chat", chatSchema);

