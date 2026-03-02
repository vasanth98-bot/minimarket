package com.minimarket.backend.controller;

import com.minimarket.backend.dto.RegisterRequest;
import com.minimarket.backend.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import com.minimarket.backend.dto.LoginRequest;
import com.minimarket.backend.dto.LoginResponse;
import com.minimarket.backend.security.JwtUtil;
import com.minimarket.backend.model.User;
import com.minimarket.backend.repository.UserRepository;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {

    System.out.println("LOGIN ATTEMPT: " + request.getEmail());
    System.out.println("PASSWORD ENTERED: " + request.getPassword());

    try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        System.out.println("AUTHENTICATION SUCCESS");

    } catch (Exception e) {

        System.out.println("AUTHENTICATION FAILED: " + e.getMessage());
        e.printStackTrace();

        return ResponseEntity.status(401).body("Invalid credentials");
    }

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

    String token = jwtUtil.generateToken(request.getEmail(), user.getRole());

    return ResponseEntity.ok(new LoginResponse(token));
}
    }



