import {Schema , model} from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    isOnline: { type: Boolean, default: false },
    preferredLanguage: { type: String, default: 'English' },
    chats : [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});


const User = model('User', userSchema);

export default User;