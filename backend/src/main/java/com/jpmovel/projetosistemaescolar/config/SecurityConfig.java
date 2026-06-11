package com.jpmovel.projetosistemaescolar.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login").permitAll() // Público
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/eventos/**").permitAll() // LIBERA TODOS OS GETs DE EVENTOS PARA VISITANTES!
                        .anyRequest().authenticated() // O resto (POST, DELETE, etc) exige login e vai cair no @PreAuthorize
                );

        return http.build();
    }
}