package com.jpmovel.projetosistemaescolar.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import com.jpmovel.projetosistemaescolar.config.CorsConfig.*;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource)) // sem isso, frontend nn consegue consummir a api
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Público
                        .requestMatchers(
                                "/api/auth/login").permitAll()
                        // LIBERA TODOS OS GETs DE EVENTOS PARA VISITANTES!
                        .requestMatchers(
                                org.springframework.http.HttpMethod.GET,
                                "/eventos/**").permitAll()
                        // Libera a interface do Swagger para ser acessado (DESATIVAR no INPROD)
                        .requestMatchers("/swagger-ui.html",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/v3/api-docs").permitAll()
                        .anyRequest().authenticated() // O resto (POST, DELETE, etc) exige login e vai cair no @PreAuthorize
                );

        return http.build();
    }
}