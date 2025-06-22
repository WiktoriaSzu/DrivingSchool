package org.example.drivingschool.controller;
import jakarta.servlet.http.HttpSession;
import org.example.drivingschool.models.LogIn;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController{
@PostMapping("/api/login")
public ResponseEntity<String> login(@RequestBody LogIn LogIn, HttpSession session) {
    String username = LogIn.getUsername();
    String password = LogIn.getPassword();
    if ("admin".equals(username) && "admin".equals(password)) {
        session.setAttribute("username", username);
        session.setAttribute("password", password);
        return ResponseEntity.ok("Login successful");
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
    }
}
}