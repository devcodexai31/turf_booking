package com.turfbooking.service;

import com.turfbooking.model.User;
import com.turfbooking.repository.UserRepository;
import com.turfbooking.dto.LoginRequest;
import com.turfbooking.dto.SignupRequest;
import com.turfbooking.dto.AuthResponse;
import com.turfbooking.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return new AuthResponse(false, "User not found");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(false, "Invalid password");
        }

        if (!user.getIsActive()) {
            return new AuthResponse(false, "User account is inactive");
        }

        UserDto userDto = convertToDto(user);
        String token = generateToken(user);
        
        AuthResponse response = new AuthResponse();
        response.setSuccess(true);
        response.setMessage("Login successful");
        response.setUser(userDto);
        response.setToken(token);
        
        return response;
    }

    public AuthResponse signup(SignupRequest request) {
        // Validate email
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email already exists");
        }

        // Validate phone number
        if (request.getPhoneNumber() != null && 
            userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            return new AuthResponse(false, "Phone number already exists");
        }

        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setIsActive(true);

        User savedUser = userRepository.save(user);

        UserDto userDto = convertToDto(savedUser);
        String token = generateToken(savedUser);
        
        AuthResponse response = new AuthResponse();
        response.setSuccess(true);
        response.setMessage("Signup successful");
        response.setUser(userDto);
        response.setToken(token);
        
        return response;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhoneNumber(user.getPhoneNumber());
        return dto;
    }

    private String generateToken(User user) {
        // Simple token generation - in production, use JWT
        return UUID.randomUUID().toString();
    }
}
