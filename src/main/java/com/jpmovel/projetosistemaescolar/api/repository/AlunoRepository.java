package com.jpmovel.projetosistemaescolar.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jpmovel.projetosistemaescolar.api.domain.Aluno;
import java.util.List;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    // Corrigido para Optional<Aluno>
    Optional<Aluno> findByIdAndAtivoTrue(Long id);

    // Mostra somente aqueles que estão estudando
    List<Aluno> findAllByAtivoTrue();
}