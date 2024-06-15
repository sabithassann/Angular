package com.example.hrm.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;


@Component
public class JwtGenerator {

    public long JWT_EXPIRATION = 70000;
//    private Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
private static final String SECRET = "638CBE3A90E0303BF3808F40F95A7F02A24B4B5D029C954CF553F79E9EF1DC0384BE681C249F1223F6B55AA21DC070914834CA22C8DD98E14A872CA010091ACC";
    private Key secretKey = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(Authentication authentication){
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + JWT_EXPIRATION);

        //For Extract roles from the authentication object
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        List<String> roles = authorities.stream()
                .map(authority -> "ROLE_" + authority.getAuthority()) // Prefix roles with "ROLE_"
                .flatMap(authority -> {
                    String[] splitRoles = authority.split(","); // Split the roles by comma
                    return Arrays.stream(splitRoles).collect(Collectors.toList()).stream();
                })
                .collect(Collectors.toList());
        //Build the token with roles included in claims
        String token = Jwts
                .builder()
                .setSubject(username)
                .claim("roles",roles) //Inclusion of roles in claims
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512,secretKey).compact();
        return token;
    }

    public String getUsernameFromJWT(String token){
        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        }catch (Exception ex){
            throw new AuthenticationCredentialsNotFoundException("JWT was exprired or incorrect",
                    ex.fillInStackTrace());
        }

    }

//    public List<String> getRolesFromJWT(String token){
//        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
//        return claims.get("roles", List.class);
//    }

    public List<String> getRolesFromJWT(String token) {
        try {
            // Remove the "Bearer " prefix from the token string
            String actualToken = token.startsWith("Bearer ") ? token.substring(7) : token;

            // Decode and parse the token
            Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(actualToken).getBody();
            return claims.get("roles", List.class);
        } catch (IllegalArgumentException e) {
            // Log the error and the token value
            System.err.println("Error parsing JWT token: " + token);
            e.printStackTrace();
            return Collections.emptyList();
        } catch (Exception e) {
            // Handle other exceptions
            e.printStackTrace();
            return Collections.emptyList();
        }
    }
}
