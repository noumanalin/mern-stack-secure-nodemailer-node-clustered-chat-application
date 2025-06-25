# mern-stack-secure-nodemailer-node-clustered-chat-application
A full-stack MERN (MongoDB, Express.js, React, Node.js) chat app to learn backend concepts like real-time chat with Socket.IO, security headers using Helmet.js to prevent XSS and Clickjacking, rate limiting for brute-force protection, NodeMailer for emails, and Node.js clustering for multi-core performance.





# 📋 Deatail API Documentation


## Register API

### 📍 POST `/api/auth/register`

Registers a new user with validation.

#### ✅ Required Fields:
- `userName`: Must be a string with at least 3 characters.
- `email`: Must be a valid email.
- `password`: Must:
  - Be at least 4 characters
  - Contain one uppercase letter
  - Contain one lowercase letter
  - Contain one number
  - Contain one special character

#### 🧪 Sample Request:

```json
{
  "userName": "AliDev",
  "email": "ali@example.com",
  "password": "Ali@1234"
}
```

#### 🎉 Success Response
##### http status code 200
```json
{
  "success": true,
  "message": "Registration done successfully 🎉"
}
```

#### 🔴 Duplicate User/Email (Status 400):
```json
{
  "success": false,
  "errors": [
    "Username 'AliDev' is already taken.",
    "Email 'ali@example.com' is already registered."
  ],
  "message": "Duplicate user information found"
}
```

#### 🔴 Server Error (Status 500):
```json
{
  "success": false,
  "error": "Something went wrong"
}
```

#### 🔴 Validation Error (400)
``` json
{
  "success": false,
  "errors": [
    "User name must be between 3-50 characters.",
    "Password must be at least 4 characters long",
    "Password must contain at least one special character.",
    "Password must contain at least one number"
  ],
  "message": "Kindly fulfill all requirements"
}
```