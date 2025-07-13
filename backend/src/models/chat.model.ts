import {Schema , model} from 'mongoose';

const chatSchema = new Schema({
    chatid : { type: String, required: true, unique: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        originalContent: { type: String, required: true },
        translatedContent: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Chat = model('Chat', chatSchema);

export default Chat;
