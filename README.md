# Driving School Management System

A full-stack web application for managing students and instructors at a driving school. Built with a **Spring Boot** REST API backend and a **vanilla JavaScript** frontend.

---

## Features

- **Student Management** — Create, read, update, and delete student records
- **Instructor Management** — Full CRUD operations for instructors
- **Hour Tracking** — Increment driving hours for individual students
- **Payment Tracking** — Track first and second payment status per student
- **Live Search** — Filter the student table in real time by name or instructor
- **Column Sorting** — Sort the table by Course Number or Hours Done
- **Login Endpoint** — Session-based authentication endpoint (`/api/login`)

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Java 17, Spring Boot 3.4.4        |
| Database   | PostgreSQL                        |
| Data Access| Spring Data JDBC (`JdbcTemplate`) |
| Build Tool | Maven                             |
| Frontend   | HTML5, CSS3, JavaScript (ES Modules) |
| UI Library | Bootstrap 5.3, jQuery 3.7         |

---

## Project Structure

```
src/
├── main/
│   ├── java/org/example/drivingschool/
│   │   ├── controller/
│   │   │   ├── StudentController.java    # REST endpoints for students
│   │   │   ├── InstructorController.java # REST endpoints for instructors
│   │   │   ├── CourseController.java
│   │   │   └── LoginController.java      # Session-based login
│   │   ├── models/
│   │   │   ├── Student.java
│   │   │   ├── Instructor.java
│   │   │   └── LogIn.java
│   │   └── repository/
│   │       ├── StudentRepository.java    # SQL queries via JdbcTemplate
│   │       └── InstructorRepository.java
│   └── resources/
│       ├── application.properties
│       └── static/                       # Frontend assets served by Spring Boot
│           ├── index.html
│           ├── script.js                 # UI logic & event handling
│           ├── api.js                    # Fetch/AJAX calls to REST API
│           ├── events.js
│           └── styles.css
└── SQL/
    ├── SeedScript                        # Database schema & seed data
    └── transactions
```

---

## REST API Endpoints

### Students — `/api/students`

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/api/students`       | Retrieve all students          |
| GET    | `/api/students/{id}`  | Retrieve a student by ID       |
| POST   | `/api/students`       | Create a new student           |
| PUT    | `/api/students/{id}`  | Update a student by ID         |
| PUT    | `/api/students/{id}/hours` | Add driving hours to a student |
| DELETE | `/api/students/{id}`  | Delete a student by ID         |

### Instructors — `/api/instructor`

| Method | Endpoint                        | Description                         |
|--------|---------------------------------|-------------------------------------|
| GET    | `/api/instructor`               | Retrieve all instructors            |
| GET    | `/api/instructor/{name}`        | Retrieve an instructor by name      |
| GET    | `/api/instructor?name={name}`   | Get instructor by student name      |
| POST   | `/api/instructor`               | Create a new instructor             |
| PUT    | `/api/instructor/{name}`        | Update an instructor                |
| DELETE | `/api/instructor/{name}`        | Delete an instructor                |

### Auth

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| POST   | `/api/login`  | Login (admin/admin) |

---

## Getting Started

### Prerequisites

- Java 17+
- Maven
- PostgreSQL

### Database Setup

1. Create a PostgreSQL database named `DrivingSchool`.
2. Run the seed script to create tables and populate sample data:

```sql
-- Located in SQL/SeedScript
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    courseId INT,
    instructorName VARCHAR(50),
    hoursDone INT,
    first_Payment BOOLEAN,
    second_Payment BOOLEAN
);

CREATE TABLE instructor (
    instructorName VARCHAR(50) PRIMARY KEY,
    description VARCHAR(150),
    carNr INT
);
```

### Configuration

Update `src/main/resources/application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/DrivingSchool
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Run the Application

```bash
./mvnw spring-boot:run
```

Then open your browser at **http://localhost:8080**.

---

## Screenshots

> Add screenshots of the UI here to make the README more visual for recruiters.

---

## Future Improvements

- Role-based authentication with Spring Security
- Course management module
- Pagination for large student lists
- Unit and integration test coverage
