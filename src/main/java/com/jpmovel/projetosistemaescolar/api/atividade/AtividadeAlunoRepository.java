package com.jpmovel.projetosistemaescolar.api.atividade;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AtividadeAlunoRepository extends JpaRepository<AtividadeAluno, Long> {

    List<AtividadeAluno> findByAlunoId(Long alunoId);

    List<AtividadeAluno> findByProfessorId(Long professorId);
}