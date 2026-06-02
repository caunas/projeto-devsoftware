package com.jpmovel.projetosistemaescolar.api.turma;

import com.jpmovel.projetosistemaescolar.api.professor.Professor;
import com.jpmovel.projetosistemaescolar.api.professor.ProfessorRepository;
import com.jpmovel.projetosistemaescolar.api.erros.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turmas")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public List<Turma> listarTodas() {
        return turmaRepository.findAllByAtivoTrue();
    }

    @PostMapping
    public ResponseEntity<Turma> criar(@RequestBody @Valid Turma turma) {
        Turma salva = turmaRepository.save(turma);
        return ResponseEntity.status(201).body(salva);
    }

    // Vincular um Professor a esta Turma
    @PostMapping("/{turmaId}/professores/{professorId}")
    public ResponseEntity<Turma> vincularProfessor(@PathVariable Long turmaId, @PathVariable Long professorId) {
        Turma turma = turmaRepository.findByIdAndAtivoTrue(turmaId)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada"));

        Professor professor = professorRepository.findByIdAndAtivoTrue(professorId)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado"));

        turma.getProfessores().add(professor);
        turmaRepository.save(turma);

        return ResponseEntity.ok(turma);
    }
}