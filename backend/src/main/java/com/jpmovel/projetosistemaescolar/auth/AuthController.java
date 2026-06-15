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
    public ResponseEntity<LoginResponse> efetuarLogin(
            @RequestBody LoginRequest dadosLogin) {

        String email = dadosLogin.email();
        String senha = dadosLogin.senha();

        Optional<? extends Usuario> usuarioEncontrado =
                alunoRepository.findAll().stream()
                        .filter(a -> a.getEmail().equals(email))
                        .findFirst();

        if (usuarioEncontrado.isEmpty()) {
            usuarioEncontrado = professorRepository.findAll().stream()
                    .filter(p -> p.getEmail().equals(email))
                    .findFirst();
        }

        if (usuarioEncontrado.isEmpty()) {
            usuarioEncontrado = coordenadorRepository.findAll().stream()
                    .filter(c -> c.getEmail().equals(email))
                    .findFirst();
        }

        if (usuarioEncontrado.isEmpty()
                || !usuarioEncontrado.get().getSenha().equals(senha)) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Usuario usuario = usuarioEncontrado.get();

        String token = tokenService.gerarToken(usuario);

        return ResponseEntity.ok(
                new LoginResponse(token)
        );
    }
}