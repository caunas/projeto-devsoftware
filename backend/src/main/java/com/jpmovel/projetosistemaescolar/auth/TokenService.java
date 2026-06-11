package com.jpmovel.projetosistemaescolar.auth;

import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class TokenService {

    // Gera uma chave secreta segura para assinar o token
    private final SecretKey CHAVE_SECRETA = Jwts.SIG.HS256.key().build();

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
                .signWith(CHAVE_SECRETA) // Assinatura digital de segurança
                .compact(); // Transforma tudo em texto
    }
}