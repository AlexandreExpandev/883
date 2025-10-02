# Counter API

A RESTful API for counting from 1 to 10.

## Features

- Start counting from 1 to 10
- Pause counting at any point
- Reset counting back to 1
- Display current count
- Automatically finish counting when reaching 10

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- SQL Server (optional, for production use)

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and configure environment variables
   ```
   cp .env.example .env
   ```
4. Build the project
   ```
   npm run build
   ```
5. Start the server
   ```
   npm start
   ```

### Development

Run the development server with hot reloading:

```
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/external/auth/login` - User login
- `POST /api/external/auth/register` - User registration
- `POST /api/external/auth/forgot-password` - Password reset request

### Counter Operations

- `POST /api/internal/counter/start` - Start counting
- `POST /api/internal/counter/pause` - Pause counting
- `POST /api/internal/counter/reset` - Reset counter to 1
- `GET /api/internal/counter/current` - Get current counter value

## Testing

Run tests with Jest:

```
npm test
```

## License

This project is licensed under the MIT License.
