package com.jpmovel.projetosistemaescolar.auth;

public record LoginRequest(
        String email,
        String senha
) {
}
