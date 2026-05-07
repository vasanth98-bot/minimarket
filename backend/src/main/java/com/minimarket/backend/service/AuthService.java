package com.minimarket.backend.service;

import com.minimarket.backend.dto.RegisterRequest;
import com.minimarket.backend.model.User;
import com.minimarket.backend.repository.UserRepository;
import com.minimarket.backend.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired; // ✅ FIXED
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder; // ✅ use only this

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ✅ REGISTER
    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // ✅ correct
        user.setRole(request.getRole());
        user.setPhone(request.getPhone());
        user.setLoginType(request.getLoginType() != null ? request.getLoginType() : com.minimarket.backend.model.LoginType.EMAIL);

        userRepository.save(user);

        return "User registered successfully";
    }

    // ✅ LOGIN
    public String login(String email, String password) {

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();

        // ✅ use same passwordEncoder here also
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }

    // ✅ LOGIN WITH PHONE
    public String loginWithPhone(String phone, String otp) {
        // Simulate OTP check
        if (!"123456".equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found with phone"));

        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }

    // ✅ LOGIN WITH GOOGLE
    public String loginWithGoogle(String email, String googleToken) {
        // Simulate google token verification
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found for Google login"));
        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }
}