package com.jpmovel.projetosistemaescolar.api.repository;

import com.jpmovel.projetosistemaescolar.api.domain.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jpmovel.projetosistemaescolar.api.domain.Aluno;

import java.util.List;
import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    Optional<Professor> findByIdAndAtivoTrue(Long id);

    List<Professor> findAllByAtivoTrue();
}