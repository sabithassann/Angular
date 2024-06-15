package com.example.hrm.security;

import com.example.hrm.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private JwtAuthEntryPoint authEntryPoint;
    public static  final String ROLE_ADMIN = "admin";
    public static  final String ROLE_USER = "user";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authz -> {
                    authz.requestMatchers("/api/home").permitAll()
                            .requestMatchers("/api/admin/**").hasAnyAuthority(ROLE_ADMIN)
                            .requestMatchers("/api/user/**").hasAnyAuthority(ROLE_USER)
                            .requestMatchers("/api/auth/**").permitAll()
                            .anyRequest().authenticated();
                })
//                .formLogin(form -> form
//                        .loginProcessingUrl("/api/auth/login")
//                        .permitAll()
//                )
                .exceptionHandling(exceptions -> exceptions.authenticationEntryPoint(authEntryPoint))
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .build();
    }

@Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
}

@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
               throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
}

@Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(){
        return new JwtAuthenticationFilter();
}


}
