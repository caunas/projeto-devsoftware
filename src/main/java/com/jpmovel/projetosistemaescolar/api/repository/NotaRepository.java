package com.jpmovel.projetosistemaescolar.api.repository;

import com.jpmovel.projetosistemaescolar.api.domain.Aluno;
import com.jpmovel.projetosistemaescolar.api.domain.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Long>{
    List<Nota> findNotasByAluno(Aluno aluno);
}
