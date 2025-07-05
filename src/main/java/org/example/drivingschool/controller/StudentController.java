package org.example.drivingschool.controller;

import org.example.drivingschool.models.Student;
import org.example.drivingschool.repository.StudentRepository;
import org.example.drivingschool.repository.InstructorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository repository;
    private final InstructorRepository InstructorRepository;
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    public StudentController(StudentRepository repository, InstructorRepository InstructorRepository) {
        this.repository = repository;
        this.InstructorRepository = InstructorRepository;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        List<Student> out = repository.getAllStudents();
        return out;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> student = repository.getStudentById(id);
        logger.info("trying to log student with id:{}", id);
        return student.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createStudent(@RequestBody Student student) {
        repository.createStudent(student);
        return ResponseEntity.ok("Cyborg created successfully!");
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int Id) {
        repository.deleteStudent(Id);
        return ResponseEntity.ok("Student deleted successfully!");
    }
}
