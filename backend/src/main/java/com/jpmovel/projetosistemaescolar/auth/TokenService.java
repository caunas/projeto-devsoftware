package com.jpmovel.projetosistemaescolar.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class TokenService {

    // Gera uma chave secreta segura para assinar o token
    private final SecretKey chaveSecreta;

    public TokenService(@Value("${app.jwt.secret}") String secret) {
        this.chaveSecreta = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // O token vai valer por 2 horas (em milissegundos)
    private final long TEMPO_EXPIRACAO = 7200000;

    public String gerarToken(Usuario usuario) {
        return Jwts.builder()
                .subject(usuario.getEmail()) // Identificador (E-mail)
                .claim("id", usuario.getId()) // Atributo ID
                .claim("nome", usuario.getNome()) // Atributo Nome
                .claim("role", usuario.getRole().name()) // Atributo Role (ALUNO, PROFESSOR...)
                .issuedAt(new Date()) // Quando foi criado
                .expiration(new Date(System.currentTimeMillis() + TEMPO_EXPIRACAO)) // Quando vence
                .signWith(chaveSecreta) // Assinatura digital de segurança
                .compact(); // Transforma tudo em texto
    }

    public Claims validarToken(String token) {
        return Jwts.parser()
                .verifyWith(chaveSecreta)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
