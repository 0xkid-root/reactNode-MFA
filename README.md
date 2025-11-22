# Two-Factor Authentication (2FA) / Multi-Factor Authentication (MFA) Project

This project implements a complete 2FA/MFA solution with a React frontend and Node.js/Express backend.

## Project Structure

```
.
├── Backend/
│   ├── package.json
│   └── [Other backend files]
└── Frontend/
    ├── package.json
    └── [Other frontend files]
```

## Technologies Used

### Backend
- **Node.js** with ES Modules
- **Express.js** v5 - Web framework
- **MongoDB/Mongoose** - Database
- **Speakeasy** - Two-factor authentication library
- **QRCode** - QR code generation for 2FA setup
- **Passport.js** - Authentication middleware
- **JWT** - JSON Web Tokens for session management
- **Bcrypt.js** - Password hashing

### Frontend
- **React** v19 - Frontend library
- **Vite** - Build tool and development server
- **ESLint** - Code linting

## Features

- User registration and login
- Two-Factor Authentication (2FA) using Time-Based One-Time Password (TOTP)
- QR code generation for easy 2FA app setup (Google Authenticator, Authy, etc.)
- Secure token-based authentication
- MongoDB integration for user data storage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud instance)
- npm or yarn package manager

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/2fa/setup` - Initiate 2FA setup
- `POST /api/2fa/verify` - Verify 2FA token
- `POST /api/2fa/disable` - Disable 2FA for user

## Usage

1. Register a new user account
2. Log in with your credentials
3. Set up 2FA by scanning the QR code with your authenticator app
4. Enter the generated code to verify and enable 2FA
5. On subsequent logins, you'll need to provide both password and 2FA code

## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens are used for secure session management
- 2FA secrets are stored securely
- CORS is enabled for controlled cross-origin requests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.