# Driving School Management System

A full-stack web application for managing the day-to-day operations of a driving school. Staff can manage students and instructors, track completed driving hours, and monitor payments through a browser-based interface.

The project demonstrates a clear separation between a Spring Boot REST API, a PostgreSQL data layer, and a lightweight frontend served by the same application.

## What the application does

- Manages student and instructor records with create, read, update, and delete operations
- Tracks completed driving hours and supports adding hours without overwriting the existing total
- Records first and second payment status for each student
- Displays instructor history for a student
- Provides live filtering by student name, instructor, and course number
- Supports sorting by course number and completed hours
- Protects application routes with Spring Security and Google OAuth2 login
- Restricts OAuth2 access to an allowlist of approved email addresses

## Highlights for reviewers

- **End-to-end feature ownership:** data models, SQL access, REST controllers, security configuration, and frontend interactions
- **RESTful backend:** focused controllers for students, instructors, and instructor history
- **Practical JDBC data access:** repositories use Spring Data JDBC and `JdbcTemplate` for explicit SQL queries
- **Maintainable frontend:** ES modules separate API calls, event handling, and UI logic
- **Security-aware configuration:** OAuth2 client secrets are supplied through environment variables rather than committed to source control

## Tech stack

| Area | Technology |
| --- | --- |
| Language | Java 17 |
| Backend | Spring Boot 3.4.4, Spring Web |
| Data access | Spring Data JDBC, `JdbcTemplate` |
| Database | PostgreSQL |
| Authentication | Spring Security, Google OAuth2 Client |
| Frontend | HTML5, CSS3, JavaScript ES modules |
| UI | Bootstrap 5.3, jQuery 3.7 |
| Build and tests | Maven, Spring Boot Test |

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
|  |  |- models/           # Student, instructor, course, and history models
|  |  |- repository/       # PostgreSQL access through JdbcTemplate
|  |  |- AllowedUserService.java
|  |  `- SecurityConfig.java
|  `- resources/
|     |- application.properties
|     `- static/            # HTML, CSS, and JavaScript frontend
`- test/                    # Spring Boot test sources

SQL/
|- SeedScript               # Database setup and sample data
`- transactions             # SQL transaction examples
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

## Getting started

### Prerequisites

- Java 17 or newer
- PostgreSQL
- A Google OAuth2 application for local login

### 1. Create the database

Create a PostgreSQL database named `DrivingSchool`, then use [`SQL/SeedScript`](./SQL/SeedScript) as the starting point for creating the tables and sample data.

### 2. Configure the application

Update `src/main/resources/application.properties` with local database values. Keep passwords and OAuth credentials outside source control:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/DrivingSchool
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET}
```

Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in the environment used to start the application. Configure the OAuth2 redirect URI for local development as:

```text
http://localhost:8080/login/oauth2/code/google
```

The allowed email address is configured in `AllowedUserService`. Update that allowlist for your own local account before signing in.

### 3. Run the application

On macOS or Linux:

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Open [http://localhost:8080](http://localhost:8080) and sign in with an authorized Google account.

### 4. Run tests

```bash
./mvnw test
```

On Windows, use `.\mvnw.cmd test`.

## License

This project is currently intended as a portfolio and learning project. No open-source license has been added yet.
