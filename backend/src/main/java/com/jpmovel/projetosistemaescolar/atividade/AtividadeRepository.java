package com.jpmovel.projetosistemaescolar.atividade;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AtividadeRepository extends JpaRepository<Atividade, Long> {

    //List<Atividade> findByAlunoId(Long alunoId);

    List<Atividade> findByProfessorId(Long professorId);
}