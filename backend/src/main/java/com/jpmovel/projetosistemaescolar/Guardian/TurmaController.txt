package com.jpmovel.projetosistemaescolar.turma;

import com.jpmovel.projetosistemaescolar.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.aluno.AlunoRepository;
import com.jpmovel.projetosistemaescolar.professor.Professor;
import com.jpmovel.projetosistemaescolar.professor.ProfessorRepository;
import com.jpmovel.projetosistemaescolar.erros.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.HashSet;

@RestController
@RequestMapping("/api/turmas")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    // 1. Coordenadores e Professores podem ver a listagem de turmas ativas
    @GetMapping
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public List<Turma> listarTodas() {
        return turmaRepository.findAllByAtivoTrue();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public ResponseEntity<Turma> buscarPorId(@PathVariable Long id) {
        Turma turma = turmaRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com ID: " + id));
        return ResponseEntity.ok(turma);
    }

    // 2. Apenas o Coordenador pode abrir/criar uma nova turma
    @PostMapping
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public ResponseEntity<Turma> criar(@RequestBody @Valid Turma turma) {
        turma.setAtivo(true);
        if (turma.getProfessores() == null) {
            turma.setProfessores(new HashSet<>());
        }
        if (turma.getAlunos() == null) {
            turma.setAlunos(new HashSet<>());
        }
        Turma salva = turmaRepository.save(turma);
        return ResponseEntity.status(201).body(salva);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public ResponseEntity<Turma> atualizar(@PathVariable Long id, @RequestBody @Valid Turma dados) {
        Turma turma = turmaRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com ID: " + id));
        turma.setNome(dados.getNome());
        return ResponseEntity.ok(turmaRepository.save(turma));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        Turma turma = turmaRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com ID: " + id));
        turma.setAtivo(false);
        turmaRepository.save(turma);
        return ResponseEntity.noContent().build();
    }

    // 3. Apenas o Coordenador pode atribuir um Professor a uma Turma
    @PostMapping("/{turmaId}/professores/{professorId}")
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Turma> vincularProfessor(@PathVariable Long turmaId, @PathVariable Long professorId) {
        Turma turma = turmaRepository.findByIdAndAtivoTrue(turmaId)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada"));

        Professor professor = professorRepository.findByIdAndAtivoTrue(professorId)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));

        turma.getProfessores().add(professor);
        turmaRepository.save(turma);

        return ResponseEntity.ok(turma);
    }

    // 4. Apenas o Coordenador pode enturmar/vincular um Aluno a uma Turma
    @PostMapping("/{turmaId}/alunos/{alunoId}")
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Turma> vincularAluno(@PathVariable Long turmaId, @PathVariable Long alunoId) {
        Turma turma = turmaRepository.findByIdAndAtivoTrue(turmaId)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada"));

        Aluno aluno = alunoRepository.findByIdAndAtivoTrue(alunoId)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado"));

        turma.getAlunos().add(aluno);
        turmaRepository.save(turma);

        return ResponseEntity.ok(turma);
    }
}
