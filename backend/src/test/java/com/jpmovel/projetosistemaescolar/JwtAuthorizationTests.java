package com.jpmovel.projetosistemaescolar;

import com.jpmovel.projetosistemaescolar.auth.JwtAuthenticationFilter;
import com.jpmovel.projetosistemaescolar.auth.Role;
import com.jpmovel.projetosistemaescolar.auth.TokenService;
import com.jpmovel.projetosistemaescolar.coordenador.Coordenador;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtAuthorizationTests {

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void authenticatesCoordinatorWithSpringRoleAuthority() throws Exception {
        TokenService tokenService = new TokenService("test-jwt-secret-with-at-least-32-bytes-2026");
        Coordenador coordenador = new Coordenador();
        coordenador.setId(1L);
        coordenador.setNome("Admin");
        coordenador.setEmail("admin@sistema.local");
        coordenador.setRole(Role.ROLE_COORDENADOR);

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", "Bearer " + tokenService.gerarToken(coordenador));

        new JwtAuthenticationFilter(tokenService).doFilter(
                request,
                new MockHttpServletResponse(),
                (servletRequest, servletResponse) -> {
                    var authentication = SecurityContextHolder.getContext().getAuthentication();
                    assertTrue(authentication.isAuthenticated());
                    assertEquals("admin@sistema.local", authentication.getName());
                    assertEquals("ROLE_COORDENADOR", authentication.getAuthorities().iterator().next().getAuthority());
                }
        );
    }
}
