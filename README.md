# Express App

## Description

This is a Node.js application built with Express.js. It includes features such as authentication, middleware for rate limiting and CORS, and a connection to MongoDB.

## Features

- Authentication using JWT
- Rate limiting and CORS middleware
- MongoDB integration
- Unit and integration tests

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/6sense-Technologies/6sense-backend-v2
    cd 6sense-backend-v2
    ```

2. **Install Server Dependencies:**
    ```bash
    npm install
    ```

3. **Create Environment Variables File:**
    Create a `.env` file in the server directory and add the following environment variables:
    ```env
    PORT=3000
    MONGODB_URI=your-mongodb-url
    JWT_SECRET=jwt-secret
    ```

4. **Start the Server:**
    ```bash
   npm start
    ```

