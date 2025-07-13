# UniChat API Documentation

This document describes the API endpoints available in the UniChat application.

## Base URL
All API endpoints are relative to: `/api/`

## Environment Variables
Make sure to set the following environment variable:
- `MONGODB_URI`: Your MongoDB connection string (defaults to `mongodb://localhost:27017/unichat`)

## User API

### Get User Information
- **GET** `/api/user`
- **Query Parameters:**
  - `id` (string): User ID (ObjectId)
  - `email` (string): User email
  
  *Note: Either `id` or `email` is required*

- **Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "username": "john_doe",
    "email": "john@example.com",
    "preferredLanguage": "en",
    "profilePicture": "profile_url",
    "createdAt": "2023-07-01T12:00:00.000Z"
  }
}
```

### Update User Profile
- **PUT** `/api/user`
- **Body:**
```json
{
  "userId": "64a1b2c3d4e5f6789012345",
  "username": "new_username",
  "preferredLanguage": "es",
  "profilePicture": "new_profile_url"
}
```

## Chat API

### Create New Chat
- **POST** `/api/chat`
- **Body:**
```json
{
  "participants": ["64a1b2c3d4e5f6789012345", "64a1b2c3d4e5f6789012346"],
  "chatName": "Group Chat Name", // Optional
  "chatPicture": "chat_picture_url" // Optional
}
```

- **Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789012347",
    "participants": [
      {
        "_id": "64a1b2c3d4e5f6789012345",
        "username": "john_doe",
        "email": "john@example.com",
        "profilePicture": "profile_url"
      }
    ],
    "messages": [],
    "chatName": "Group Chat Name",
    "chatPicture": "chat_picture_url",
    "createdAt": "2023-07-01T12:00:00.000Z"
  }
}
```

### Get User's Chats
- **GET** `/api/chat?userId=64a1b2c3d4e5f6789012345`
- **Query Parameters:**
  - `userId` (string, required): User ID to get chats for

### Get Specific Chat
- **GET** `/api/chat?chatId=64a1b2c3d4e5f6789012347`
- **Query Parameters:**
  - `chatId` (string, required): Chat ID to retrieve

### Update Chat Details
- **PUT** `/api/chat`
- **Body:**
```json
{
  "chatId": "64a1b2c3d4e5f6789012347",
  "userId": "64a1b2c3d4e5f6789012345",
  "chatName": "Updated Chat Name",
  "chatPicture": "new_chat_picture_url"
}
```

## Message API

### Send Message
- **POST** `/api/chat/message`
- **Body:**
```json
{
  "sender": "64a1b2c3d4e5f6789012345",
  "receiver": "64a1b2c3d4e5f6789012346",
  "chatId": "64a1b2c3d4e5f6789012347",
  "content": "Hello, how are you?"
}
```

### Get Chat Messages
- **GET** `/api/chat/message?chatId=64a1b2c3d4e5f6789012347&page=1&limit=50`
- **Query Parameters:**
  - `chatId` (string, required): Chat ID to get messages for
  - `page` (number, optional): Page number for pagination (default: 1)
  - `limit` (number, optional): Number of messages per page (default: 50)

- **Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "_id": "64a1b2c3d4e5f6789012348",
        "sender": {
          "_id": "64a1b2c3d4e5f6789012345",
          "username": "john_doe",
          "profilePicture": "profile_url"
        },
        "receiver": {
          "_id": "64a1b2c3d4e5f6789012346",
          "username": "jane_doe",
          "profilePicture": "profile_url"
        },
        "chatId": "64a1b2c3d4e5f6789012347",
        "content": "Hello, how are you?",
        "timestamp": "2023-07-01T12:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalMessages": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

## Error Responses

All endpoints return errors in the following format:
```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Error Status Codes:
- `400` - Bad Request (missing required fields, invalid data)
- `403` - Forbidden (user not authorized for action)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Features

### Chat Features:
- Create direct messages (2 participants) or group chats (3+ participants)
- Automatic duplicate chat detection for direct messages
- Chat participants validation
- Chat name and picture customization
- Message history with pagination

### User Features:
- Get user by ID or email
- Update user profile information
- Password excluded from all responses for security

### Message Features:
- Send messages to existing chats
- Retrieve message history with pagination
- Populated sender/receiver information
- Chronological message ordering

## Database Models

The API uses the following MongoDB models:
- **User**: username, email, password, preferredLanguage, profilePicture
- **Chat**: participants[], messages[], chatName, chatPicture, createdAt
- **Message**: sender, receiver, chatId, content, timestamp
