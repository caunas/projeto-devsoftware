package com.jpmovel.projetosistemaescolar.coordenador;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CoordenadorRepository extends JpaRepository<Coordenador, Long> {

    // Retorna um Optional de Coordenador (a caixa protetora contra NullPointerException)
    Optional<Coordenador> findByIdAndAtivoTrue(Long id);

    // Lista apenas os coordenadores que estão trabalhando atualmente
    List<Coordenador> findAllByAtivoTrue();

    // Retorna um Optional de Coordenador em uma busca por email
    Optional<Coordenador> findByEmail(String email);
}