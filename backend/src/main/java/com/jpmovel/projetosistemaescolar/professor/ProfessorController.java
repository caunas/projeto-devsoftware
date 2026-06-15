package com.jpmovel.projetosistemaescolar.professor;

import com.jpmovel.projetosistemaescolar.auth.Role;
import com.jpmovel.projetosistemaescolar.erros.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/professores")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    // 1. Apenas Coordenadores e Professores podem listar a equipe docente
    @GetMapping
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public List<Professor> listarTodosAtivos() {
        return professorRepository.findAllByAtivoTrue();
    }

    // 2. O próprio Professor e o Coordenador podem ver os detalhes do cadastro
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public ResponseEntity<Professor> buscarPorId(@PathVariable Long id) {
        Professor professor = professorRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado ou inativo com ID: " + id));
        return ResponseEntity.ok(professor);
    }

    // 3. Apenas o Coordenador pode cadastrar novos professores na escola
    @PostMapping
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Professor> cadastrar(@RequestBody @Valid Professor professor) {
        professor.setRole(Role.ROLE_PROFESSOR); // Sistema injeta a role correta de forma segura
        professor.setAtivo(true);               // Começa ativo por padrão

        Professor salvo = professorRepository.save(professor);
        return ResponseEntity.status(201).body(salvo);
    }

    // 4. Apenas o Coordenador pode desativar o acesso de um professor
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        Professor professor = professorRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado para desativação. ID: " + id));

        professor.setAtivo(false);
        professorRepository.save(professor);

        return ResponseEntity.noContent().build();
    }
}