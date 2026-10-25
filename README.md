# Driving School Management System

A full-stack web application for managing the day-to-day operations of a driving school. Staff can manage students and instructors, track completed driving hours, and monitor payments through a browser-based interface.

## What the application does

- Manages student and instructor records with create, read, update, and delete operations
- Tracks completed driving hours and supports adding hours without overwriting the existing total
- Records first and second payment status for each student
- Displays instructor history for a student
- Provides live filtering by student name, instructor, and course number
- Supports sorting by course number and completed hours
- Protects application routes with Spring Security and Google OAuth2 login
- Restricts OAuth2 access to an allowlist of approved email addresses

### Add student
<img width="454" height="293" alt="Image" src="https://github.com/user-attachments/assets/8bf772e1-aca5-4c9c-b413-fa7d81bfb0fc" />

### Student table with search & filter
<img width="869" height="413" alt="Image" src="https://github.com/user-attachments/assets/39a60a80-d17f-429b-9b18-e9b6af400646" />

### Edit student
<img width="456" height="425" alt="Image" src="https://github.com/user-attachments/assets/2e045877-6f8e-4449-8a7f-f8dd87947452" />


## Tech stack

| Area | Technology |
| --- | --- |
| Language | Java 21 |
| Backend | Spring Boot 3.4.4, Spring Web |
| Data access | JdbcTemplate and SQL |
| Database | PostgreSQL |
| Authentication | Spring Security, Google OAuth2 Client |
| Frontend | HTML5, CSS3, JavaScript ES modules |
| UI | Bootstrap 5.3 |
| Build and tests | Maven, Spring Boot Test |

## Getting started

### Prerequisites

- Java 21 or newer
- PostgreSQL
- A Google OAuth2 application for local login

### 1. Create the database

Create a PostgreSQL database named `DrivingSchool`, then use [`SQL/SeedScript`](./SQL/SeedScript) as the starting point for creating the tables and sample data.

### 2. Configure the application

Passwords and keys are read from environment variables, so nothing secret is stored in the code. Set all four of these in the terminal you start the application from:

| Variable | What it's for |
| --- | --- |
| `databasedrivingschool` | Password for the PostgreSQL user `postgres` |
| `GOOGLE_CLIENT_ID` | Client ID of your Google OAuth2 app |
| `GOOGLE_CLIENT_SECRET` | Client secret of your Google OAuth2 app |
| `ALLOWED_EMAILS` | Comma-separated list of email addresses that may sign in. If it's empty or missing, nobody can sign in. |

On Windows (PowerShell):

```powershell
$env:databasedrivingschool = "your_database_password"
$env:GOOGLE_CLIENT_ID = "your_client_id"
$env:GOOGLE_CLIENT_SECRET = "your_client_secret"
$env:ALLOWED_EMAILS = "you@example.com,other@example.com"
```

On macOS or Linux:

```bash
export databasedrivingschool="your_database_password"
export GOOGLE_CLIENT_ID="your_client_id"
export GOOGLE_CLIENT_SECRET="your_client_secret"
export ALLOWED_EMAILS="you@example.com,other@example.com"
```

In your Google OAuth2 app, add this redirect URI for local development:

```text
http://localhost:8080/login/oauth2/code/google
```

The database address and user are set in `src/main/resources/application.properties`: the application connects to `jdbc:postgresql://localhost:5432/DrivingSchool` as the user `postgres`. To use a different database or user, set `SPRING_DATASOURCE_URL` or `SPRING_DATASOURCE_USERNAME`, which override those values.

### 3. Run the application

Run by executing the following command:

```
./mvnw spring-boot:run
```

Open [http://localhost:8080](http://localhost:8080) and sign in with an authorized Google account.

### 4. Run tests

```
./mvnw test
```

## Architecture

```text
Browser
  |
  +-- HTML / CSS / JavaScript modules
  |
  v
Spring Boot application
  +-- REST controllers
  +-- Domain models
  +-- JDBC repositories
  +-- Spring Security + Google OAuth2
  |
  v
PostgreSQL
```

The frontend is served from Spring Boot's `static` resources, so the application can be run as a single deployable service during development.

## Project structure

```text
src/
|- main/
|  |- java/org/example/drivingschool/
|  |  |- controller/       # REST API endpoints
|  |  |- models/           # Student, instructor, and history models
|  |  |- repository/       # PostgreSQL access through JdbcTemplate
|  |  |- AllowedUserService.java
|  |  `- SecurityConfig.java
|  `- resources/
|     |- application.properties
|     `- static/            # HTML, CSS, and JavaScript frontend
`- test/                    # Spring Boot test sources

SQL/
|- SeedScript               # Database setup and sample data
```

## REST API overview

### Students — `/api/students`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/students` | List all students |
| `GET` | `/api/students/{id}` | Get one student |
| `POST` | `/api/students` | Create a student |
| `PUT` | `/api/students/{id}` | Update a student |
| `PUT` | `/api/students/{id}/hours` | Add driving hours |
| `DELETE` | `/api/students/{id}` | Delete a student |

### Instructors — `/api/instructor`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/instructor` | List all instructors |
| `GET` | `/api/instructor/{instructorName}` | Get one instructor |
| `GET` | `/api/instructor?name={studentName}` | Find an instructor by student name |
| `POST` | `/api/instructor` | Create an instructor |
| `PUT` | `/api/instructor/{instructorName}` | Update an instructor |
| `DELETE` | `/api/instructor/{instructorName}` | Delete an instructor |

### Instructor history — `/api/instructor-history`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/instructor-history/student/{studentId}` | Get a student's instructor history |
| `POST` | `/api/instructor-history` | Create a history entry |
| `PUT` | `/api/instructor-history/{historyId}` | Update a history entry |
| `DELETE` | `/api/instructor-history/student/{studentId}` | Delete history for a student |
