package com.jpmovel.projetosistemaescolar.api.repository;

import com.jpmovel.projetosistemaescolar.api.domain.AtividadeAluno;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AtividadeAlunoRepository extends JpaRepository<AtividadeAluno, Long> {

    List<AtividadeAluno> findByAlunoId(Long alunoId);

    List<AtividadeAluno> findByProfessorId(Long professorId);
}