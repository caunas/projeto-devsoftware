package com.jpmovel.projetosistemaescolar.atividade;

import com.jpmovel.projetosistemaescolar.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.aluno.AlunoRepository;
import com.jpmovel.projetosistemaescolar.professor.Professor;
import com.jpmovel.projetosistemaescolar.professor.ProfessorRepository;
import com.jpmovel.projetosistemaescolar.turma.Turma;
import com.jpmovel.projetosistemaescolar.turma.TurmaRepository;
import com.jpmovel.projetosistemaescolar.atividadeAluno.AtividadeAluno;
import com.jpmovel.projetosistemaescolar.atividadeAluno.AtividadeAlunoRepository;
import com.jpmovel.projetosistemaescolar.erros.ResourceNotFoundException;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/atividades")
public class AtividadeController {

    @Autowired
    private AtividadeRepository atividadeRepository;

    @Autowired
    private AtividadeAlunoRepository atividadeAlunoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    // 1. Apenas o PROFESSOR pode lançar uma atividade para a TURMA
    @PostMapping
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<Atividade> lancarAtividade(@RequestBody @Valid Atividade atividade) {
        // Valida se a turma existe e está ativa
        Turma turma = turmaRepository.findByIdAndAtivoTrue(atividade.getTurma().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada ou inativa"));

        // Valida se o professor existe e está ativo
        Professor professor = professorRepository.findByIdAndAtivoTrue(atividade.getProfessor().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado ou inativo"));

        // Vincula as entidades de volta na atividade geral
        atividade.setTurma(turma);
        atividade.setProfessor(professor);
        Atividade atividadeSalva = atividadeRepository.save(atividade);

        // BUSCA EM LOTE: Pega todos os alunos ativos que pertencem a essa turma específica
        List<Aluno> alunosDaTurma = alunoRepository.findAllByAtivoTrue().stream()
                .filter(aluno -> aluno.getTurmas() != null && aluno.getTurmas().equals(turma.getId()))
                .toList();

        // Para cada aluno da turma, gera uma "folha de entrega" em branco na tabela atividades_alunos
        for (Aluno aluno : alunosDaTurma) {
            AtividadeAluno entregaIndividual = new AtividadeAluno();
            entregaIndividual.setAtividade(atividadeSalva);
            entregaIndividual.setAluno(aluno);
            // resposta e nota começam como null automaticamente
            atividadeAlunoRepository.save(entregaIndividual);
        }

        return ResponseEntity.status(201).body(atividadeSalva);
    }

    // 2. Apenas o ALUNO pode enviar a resposta para a sua entrega específica
    @PatchMapping("/entregas/{entregaId}/responder")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<AtividadeAluno> responderAtividade(@PathVariable Long entregaId, @RequestBody String resposta) {
        // Busca o registro individual da resposta do aluno
        AtividadeAluno entrega = atividadeAlunoRepository.findById(entregaId)
                .orElseThrow(() -> new ResourceNotFoundException("Registro de entrega não encontrado com ID: " + entregaId));

        // Regra de segurança: Se já foi corrigido, bloqueia alteração
        if (entrega.getNota() != null) {
            throw new IllegalStateException("Esta atividade já foi avaliada pelo professor e não pode ser modificada.");
        }

        entrega.setResposta(resposta);
        entrega.setDataEntrega(LocalDateTime.now()); // Registra o momento exato do envio

        AtividadeAluno entregaRespondida = atividadeAlunoRepository.save(entrega);
        return ResponseEntity.ok(entregaRespondida);
    }

    // 3. Apenas o PROFESSOR corrige e dá a nota para a entrega de um aluno específico
    @PatchMapping("/entregas/{entregaId}/nota")
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<AtividadeAluno> darNota(@PathVariable Long entregaId, @RequestParam Double nota) {
        // Valida a nota do sistema escolar
        if (nota < 0 || nota > 10) {
            throw new IllegalArgumentException("A nota deve ser entre 0.0 e 10.0");
        }

        // Busca a entrega individual
        AtividadeAluno entrega = atividadeAlunoRepository.findById(entregaId)
                .orElseThrow(() -> new ResourceNotFoundException("Registro de entrega não encontrado com ID: " + entregaId));

        entrega.setNota(nota);
        AtividadeAluno entregaCorrigida = atividadeAlunoRepository.save(entrega);
        return ResponseEntity.ok(entregaCorrigida);
    }

    // 4. Alunos (as suas próprias), Professores e Coordenadores podem listar as entregas de um aluno
    @GetMapping("/aluno/{alunoId}")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR', 'ALUNO')")
    public ResponseEntity<List<AtividadeAluno>> listarPorAluno(@PathVariable Long alunoId) {
        List<AtividadeAluno> atividadesDoAluno = atividadeAlunoRepository.findByAlunoId(alunoId);
        return ResponseEntity.ok(atividadesDoAluno);
    }
}