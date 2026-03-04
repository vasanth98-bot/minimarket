package com.minimarket.backend.service;

import com.minimarket.backend.dto.RegisterRequest;
import com.minimarket.backend.model.Role;
import com.minimarket.backend.model.User;
import com.minimarket.backend.repository.UserRepository;
import com.minimarket.backend.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ✅ REGISTER
    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.email).isPresent()) {
            return "Email already exists";
        }

        User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setPassword(encoder.encode(request.password));
        user.setRole(Role.BUYER);

        userRepository.save(user);

        return "User registered successfully";
    }

    public String login(String email, String password) {

    Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
         throw new RuntimeException("User not found");
        }

        User user = userOpt.get();

        if (!encoder.matches(password, user.getPassword())) {
        throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }

}




