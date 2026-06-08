package com.jpmovel.projetosistemaescolar.api.fatura;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FaturaRepository extends JpaRepository<Fatura, Long> {

    // Busca o histórico financeiro completo de um aluno
    List<Fatura> findByAlunoId(Long alunoId);

    // Busca faturas por status (útil para relatórios de inadimplência)
    List<Fatura> findByStatus(String status);
}