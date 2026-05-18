package com.jpmovel.projetosistemaescolar.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jpmovel.projetosistemaescolar.api.domain.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long>{
}
