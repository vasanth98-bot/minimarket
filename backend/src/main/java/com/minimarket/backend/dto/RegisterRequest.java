package com.minimarket.backend.dto;

import com.minimarket.backend.model.Role;

public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private Role role;   // ✅ FIXED (use enum instead of String)

    // ✅ Getters & Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}