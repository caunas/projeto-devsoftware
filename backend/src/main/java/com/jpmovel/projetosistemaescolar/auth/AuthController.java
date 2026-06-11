package com.jpmovel.projetosistemaescolar.auth;

import com.jpmovel.projetosistemaescolar.aluno.AlunoRepository;
import com.jpmovel.projetosistemaescolar.coordenador.CoordenadorRepository;
import com.jpmovel.projetosistemaescolar.professor.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
//Verifica se precisa permanecer o '/api"
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AlunoRepository alunoRepository;
    @Autowired private ProfessorRepository professorRepository;
    @Autowired private CoordenadorRepository coordenadorRepository;

    @Autowired private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> efetuarLogin(@RequestBody Map<String, String> dadosLogin) {
        String email = dadosLogin.get("email");
        String senha = dadosLogin.get("senha");

        // 1. Procura o e-mail nas tabelas do banco
        Optional<? extends Usuario> usuarioEncontrado = alunoRepository.findAll().stream()
                .filter(a -> a.getEmail().equals(email)).findFirst();

        if (usuarioEncontrado.isEmpty()) {
            usuarioEncontrado = professorRepository.findAll().stream()
                    .filter(p -> p.getEmail().equals(email)).findFirst();
        }
        if (usuarioEncontrado.isEmpty()) {
            usuarioEncontrado = coordenadorRepository.findAll().stream()
                    .filter(c -> c.getEmail().equals(email)).findFirst();
        }

        // 2. Valida se achou e se a senha bate
        if (usuarioEncontrado.isEmpty() || !usuarioEncontrado.get().getSenha().equals(senha)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha inválidos.");
        }

        // 3. Se deu certo, gera o Token usando o TokenService
        Usuario usuario = usuarioEncontrado.get();
        String token = tokenService.gerarToken(usuario);

        // Retorna o token bonitinho em JSON
        return ResponseEntity.ok(Map.of("token", token));
    }
}