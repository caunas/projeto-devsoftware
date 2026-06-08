package com.jpmovel.projetosistemaescolar.atividadeAluno;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AtividadeAlunoRepository extends JpaRepository<AtividadeAluno, Long> {

    // Para o aluno ver todas as tarefas dele:
    List<AtividadeAluno> findByAlunoId(Long alunoId);

    // Para o professor ver quem já respondeu aquela atividade específica da turma:
    List<AtividadeAluno> findByAtividadeId(Long atividadeId);
}