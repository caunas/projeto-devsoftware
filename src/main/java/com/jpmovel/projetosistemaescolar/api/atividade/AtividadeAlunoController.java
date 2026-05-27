package com.jpmovel.projetosistemaescolar.api.atividade;

import com.jpmovel.projetosistemaescolar.api.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.api.professor.Professor;
import com.jpmovel.projetosistemaescolar.api.erros.ResourceNotFoundException;
import com.jpmovel.projetosistemaescolar.api.aluno.AlunoRepository;
import com.jpmovel.projetosistemaescolar.api.professor.ProfessorRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atividades")
public class AtividadeAlunoController {

    @Autowired
    private AtividadeAlunoRepository atividadeRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    // 1.Professor cria para o Aluno
    @PostMapping
    public ResponseEntity<AtividadeAluno> lancarAtividade(@RequestBody @Valid AtividadeAluno atividade) {
        // Valida se o aluno existe e está ativo
        Aluno aluno = alunoRepository.findByIdAndAtivoTrue(atividade.getAluno().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado ou inativo"));

        // Valida se o professor existe e está ativo
        Professor professor = professorRepository.findByIdAndAtivoTrue(atividade.getProfessor().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado ou inativo"));

        // Vincula as entidades validadas de volta na atividade
        atividade.setAluno(aluno);
        atividade.setProfessor(professor);

        AtividadeAluno salva = atividadeRepository.save(atividade);
        return ResponseEntity.status(201).body(salva);
    }

    // 2. Professor corrige a atividade
    @PatchMapping("/{id}/nota") // PatchMapping é ideal para atualizações parciais (só a nota)
    public ResponseEntity<AtividadeAluno> darNota(@PathVariable Long id, @RequestParam Double nota) {
        // Valida a nota
        if (nota < 0 || nota > 10) {
            throw new IllegalArgumentException("A nota deve ser entre 0.0 e 10.0");
        }

        // Busca a atividade
        AtividadeAluno atividade = atividadeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Atividade não encontrada com ID: " + id));

        // Atualiza apenas a nota
        atividade.setNota(nota);
        atividadeRepository.save(atividade);

        return ResponseEntity.ok(atividade);
    }

    // 3. Busca a atividade do aluno
    @GetMapping("/aluno/{alunoId}")
    public List<AtividadeAluno> listarPorAluno(@PathVariable Long alunoId) {
        return atividadeRepository.findByAlunoId(alunoId);
    }
}