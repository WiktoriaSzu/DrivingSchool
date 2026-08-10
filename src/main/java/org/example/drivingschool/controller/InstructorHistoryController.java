package org.example.drivingschool.controller;

import java.util.List;

import org.example.drivingschool.models.InstructorHistory;
import org.example.drivingschool.repository.InstructorHistoryRepository;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/instructor-history")

public class InstructorHistoryController {
    
    private final InstructorHistoryRepository InstructorHistoryRepository;

    public InstructorHistoryController(InstructorHistoryRepository instructorHistoryRepository) {
        this.InstructorHistoryRepository = instructorHistoryRepository;
    }

    @GetMapping("/student/{studentId}")
    public List<InstructorHistory> getHistoryForStudent(@PathVariable int studentId) {
        return InstructorHistoryRepository.getHistoryForStudent(studentId);
    }

    @PostMapping
    public ResponseEntity<String> createHistory(@RequestBody InstructorHistory history) {
        int rows = InstructorHistoryRepository.createHistory(history);
        if (rows == 1) {
          return ResponseEntity.status(HttpStatus.CREATED).body("History created");  
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("History not created");
    }

    @PutMapping("/{historyId}")
    public ResponseEntity<String> updateHistory(@PathVariable int historyId, @RequestBody InstructorHistory history) {
        int rows = InstructorHistoryRepository.updateHistory(historyId, history);
        if (rows == 1) {
            return ResponseEntity.ok("History updated");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("History not updated");
    }

    @DeleteMapping("/student/{studentId}")
    public ResponseEntity<String> deleteHistoryForStudent(@PathVariable int studentId) {
        int rows = InstructorHistoryRepository.deleteHistoryForStudent(studentId);
        if (rows > 0) {
            return ResponseEntity.ok("History deleted for student with ID: " + studentId);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No history found for student with ID: " + studentId);
    }
}
