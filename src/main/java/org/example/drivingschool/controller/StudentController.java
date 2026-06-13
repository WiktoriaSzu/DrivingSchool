package org.example.drivingschool.controller;

import java.util.List;
import java.util.Optional;

import org.example.drivingschool.models.Student;
import org.example.drivingschool.repository.InstructorRepository;
import org.example.drivingschool.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return ResponseEntity.ok("Student created successfully!");
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int Id) {
        repository.deleteStudent(Id);
        return ResponseEntity.ok("Student deleted successfully!");
    }

    @PutMapping("/{Id}")
    public ResponseEntity<String> updateStudent(@PathVariable int Id, @RequestBody Student student) {
        repository.updateStudent(Id, student);
        return ResponseEntity.ok("Student created successfully!");
    }
}
