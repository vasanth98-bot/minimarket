package com.minimarket.backend.dto;

public class LoginRequest {

    private String email;
    private String password;
    private String phone;
    private String otp;
    private String googleToken;
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getPhone() {
        return phone;
    }

    public String getOtp() {
        return otp;
    }

    public String getGoogleToken() {
        return googleToken;
    }
}

