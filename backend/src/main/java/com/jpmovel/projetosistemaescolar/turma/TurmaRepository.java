package com.jpmovel.projetosistemaescolar.turma;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
    Optional<Turma> findByIdAndAtivoTrue(Long id);
    List<Turma> findAllByAtivoTrue();
}