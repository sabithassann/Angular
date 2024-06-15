package com.example.hrm.controller;


import com.example.hrm.dao.AppUserRepository;
import com.example.hrm.dao.RoleRepository;
import com.example.hrm.dto.AuthResponseDto;
import com.example.hrm.dto.LoginDto;
import com.example.hrm.dto.RegisterDto;
import com.example.hrm.model.AppUser;
import com.example.hrm.model.Role;
import com.example.hrm.security.JwtGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private AppUserRepository appUserRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    private JwtGenerator jwtGenerator;
    @Autowired
    public AuthController(AppUserRepository appUserRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtGenerator jwtGenerator) {
        this.appUserRepository = appUserRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }






    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        if (appUserRepository.existsByUsername(registerDto.getUsername())){
            return new ResponseEntity<>("username is taken!", HttpStatus.BAD_REQUEST);
        }

        AppUser appUser = new AppUser();
        appUser.setUsername(registerDto.getUsername());
        appUser.setPassword(passwordEncoder.encode((registerDto.getPassword())));

        Role role = roleRepository.findByName(registerDto.getRole())
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(registerDto.getRole());
                    return roleRepository.save(newRole);
                });
        appUser.setRoles(Collections.singletonList(role));

        appUserRepository.save(appUser);

        return new ResponseEntity<>("user registered success!", HttpStatus.OK);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String response = "You have successfully logged in!";
//        return new ResponseEntity<>(response, HttpStatus.OK);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token),HttpStatus.OK);


    }


    @GetMapping("me")
    public ResponseEntity<List<String>> getMe(@RequestHeader("Authorization") String token) {
        String trimmedToken = token.trim(); // Trim the token string
        System.out.println("Received token: " + trimmedToken); // Print the trimmed token

        List<String> roles = jwtGenerator.getRolesFromJWT(trimmedToken);
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }




}
