package org.example.drivingschool.controller;

import org.example.drivingschool.models.Instructor;
import org.example.drivingschool.repository.InstructorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/instructor")
public class InstructorController {

    private final InstructorRepository repository;

    public InstructorController(InstructorRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Instructor> getAllInstructors() {
        return repository.getAllInstructors();
    }

    @GetMapping(params = "name")
    public List<Instructor> getInstructorByStudentName(@RequestParam String name) {
        return repository.getInstructorByStudentName(name);
    }

    @GetMapping("/{instructorName}")
    public ResponseEntity<Instructor> getInstructorById(@PathVariable String instructorName) {
        Optional<Instructor> instructor = repository.getInstructorById(instructorName);
        return instructor.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createInstructor(@RequestBody Instructor instructor) {
        repository.createInstructor(instructor);
        return ResponseEntity.ok("Instructor created successfully!");
    }

    @PutMapping("/{instructorName}")
    public ResponseEntity<String> updateInstructor(@PathVariable String instructorName, @RequestBody Instructor instructor) {
        int updatedRows = repository.updateInstructor(instructorName, instructor);
        if (updatedRows > 0) {
            return ResponseEntity.ok("Instructor updated successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }

    }

        @DeleteMapping("/{instructorName}")
        public ResponseEntity<String> deleteInstructor(@PathVariable String instructorName) {
            int deletedRows = repository.deleteInstructor(instructorName);
            if (deletedRows == 0) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok("Instructor deleted successfully!");
        }


}



