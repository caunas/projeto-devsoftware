package com.jpmovel.projetosistemaescolar.turma;

import com.jpmovel.projetosistemaescolar.aluno.Aluno;               // Adicionado o import do Aluno
import com.jpmovel.projetosistemaescolar.aluno.AlunoRepository;     // Adicionado o import do AlunoRepository
import com.jpmovel.projetosistemaescolar.professor.Professor;
import com.jpmovel.projetosistemaescolar.professor.ProfessorRepository;
import com.jpmovel.projetosistemaescolar.erros.ResourceNotFoundException;
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

    @Autowired
    private AlunoRepository alunoRepository; // Injetado para podermos buscar o aluno

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

    // Função nova eu Copiei a lógica de cima para colocar o Aluno na Turma
    @PostMapping("/{turmaId}/alunos/{alunoId}")
    public ResponseEntity<Turma> vincularAluno(@PathVariable Long turmaId, @PathVariable Long alunoId) {
        Turma turma = turmaRepository.findByIdAndAtivoTrue(turmaId)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada"));

        Aluno aluno = alunoRepository.findByIdAndAtivoTrue(alunoId)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado"));

        // Adiciona o aluno na lista de alunos daquela turma
        turma.getAlunos().add(aluno);
        turmaRepository.save(turma);

        return ResponseEntity.ok(turma);
    }
}