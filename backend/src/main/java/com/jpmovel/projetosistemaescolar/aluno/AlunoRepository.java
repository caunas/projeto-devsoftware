package com.jpmovel.projetosistemaescolar.aluno;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    // Corrigido para Optional<Aluno>
    Optional<Aluno> findByIdAndAtivoTrue(Long id);

    // Mostra somente aqueles que estão estudando
    List<Aluno> findAllByAtivoTrue();
}