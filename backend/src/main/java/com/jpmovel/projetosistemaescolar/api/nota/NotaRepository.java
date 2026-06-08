package com.jpmovel.projetosistemaescolar.api.nota;

import com.jpmovel.projetosistemaescolar.api.aluno.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Long>{
    List<Nota> findNotasByAluno(Aluno aluno);
}
