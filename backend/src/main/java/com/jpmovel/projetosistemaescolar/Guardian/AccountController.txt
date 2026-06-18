package com.jpmovel.projetosistemaescolar.auth;

import com.jpmovel.projetosistemaescolar.aluno.AlunoRepository;
import com.jpmovel.projetosistemaescolar.coordenador.CoordenadorRepository;
import com.jpmovel.projetosistemaescolar.professor.ProfessorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final AlunoRepository alunoRepository;
    private final ProfessorRepository professorRepository;
    private final CoordenadorRepository coordenadorRepository;

    public AccountController(AlunoRepository alunoRepository,
                             ProfessorRepository professorRepository,
                             CoordenadorRepository coordenadorRepository) {
        this.alunoRepository = alunoRepository;
        this.professorRepository = professorRepository;
        this.coordenadorRepository = coordenadorRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<Usuario> buscarPerfil(Authentication authentication) {
        return ResponseEntity.ok(encontrarUsuario(authentication.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<Usuario> atualizarPerfil(Authentication authentication,
                                                    @RequestBody Map<String, String> dados) {
        Usuario usuario = encontrarUsuario(authentication.getName());
        if (dados.get("nome") != null && !dados.get("nome").isBlank()) {
            usuario.setNome(dados.get("nome").trim());
        }
        if (dados.get("email") != null && !dados.get("email").isBlank()) {
            usuario.setEmail(dados.get("email").trim());
        }
        return ResponseEntity.ok(salvar(usuario));
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Void> alterarSenha(Authentication authentication,
                                             @RequestBody Map<String, String> dados) {
        Usuario usuario = encontrarUsuario(authentication.getName());
        String senhaAtual = dados.get("senhaAtual");
        String novaSenha = dados.get("novaSenha");

        if (senhaAtual == null || !senhaAtual.equals(usuario.getSenha())) {
            return ResponseEntity.status(422).build();
        }
        if (novaSenha == null || novaSenha.length() < 6) {
            return ResponseEntity.badRequest().build();
        }

        usuario.setSenha(novaSenha);
        salvar(usuario);
        return ResponseEntity.noContent().build();
    }

    private Usuario encontrarUsuario(String email) {
        return alunoRepository.findByEmail(email).map(usuario -> (Usuario) usuario)
                .or(() -> professorRepository.findByEmail(email).map(usuario -> (Usuario) usuario))
                .or(() -> coordenadorRepository.findByEmail(email).map(usuario -> (Usuario) usuario))
                .orElseThrow(() -> new IllegalStateException("Usuário autenticado não encontrado"));
    }

    private Usuario salvar(Usuario usuario) {
        if (usuario instanceof com.jpmovel.projetosistemaescolar.aluno.Aluno aluno) {
            return alunoRepository.save(aluno);
        }
        if (usuario instanceof com.jpmovel.projetosistemaescolar.professor.Professor professor) {
            return professorRepository.save(professor);
        }
        return coordenadorRepository.save((com.jpmovel.projetosistemaescolar.coordenador.Coordenador) usuario);
    }
}
