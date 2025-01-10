# Installation Guide

This guide explains how to set up and run the application on your local development environment.

---

## Prerequisites

Make sure you have the following installed:

- **.NET 8 SDK**: Download from [dotnet.microsoft.com](https://dotnet.microsoft.com/download).
- **Node.js**: Version 20 or higher. Download from [nodejs.org](https://nodejs.org/).
- **PostgreSQL**: Version 16 or higher. Download from [postgresql.org](https://www.postgresql.org/download/).
- **Docker**: For running the backend and database. Download from [docker.com](https://www.docker.com/).

---

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Configure the Environment

1. Create a `.env` file in the root directory with the following variables:

   ```bash
   POSTGRES_USER=your_username
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=your_database
   POSTGRES_HOST=postgres
   ```

2. Update the `appsettings.json` file with your PostgreSQL connection string:

   ```json
   "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=your_database;Username=your_username;Password=your_password"
   }
   ```

---

### 3. Build and Run the Application

Using Docker:

1. Build the containers:

   ```bash
   docker-compose up --build
   ```

2. Access the services:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **API**: [http://localhost:5013/swagger](http://localhost:5013/swagger)

Without Docker:

1. Run the PostgreSQL database.
2. Migrate the database schema:

   ```bash
   dotnet ef database update
   ```

3. Start the API:

   ```bash
   cd backend
   dotnet run
   ```

4. Start the frontend:

   ```bash
   cd frontend
   yarn install
   yarn start
   ```

---

### 4. Verify the Setup

- Access the **Swagger UI** at [http://localhost:5013/swagger](http://localhost:5013/swagger) to test API endpoints.
- The **frontend** should be accessible at [http://localhost:3000](http://localhost:3000).

---

## Troubleshooting

- Ensure Docker Desktop is running if using Docker.
- Verify PostgreSQL credentials in `.env` and `appsettings.json`.
- Check that the required ports (3000 and 5013) are not already in use.