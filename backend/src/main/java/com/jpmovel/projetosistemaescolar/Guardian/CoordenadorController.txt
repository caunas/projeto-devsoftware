package com.jpmovel.projetosistemaescolar.coordenador;

import com.jpmovel.projetosistemaescolar.auth.Role;
import com.jpmovel.projetosistemaescolar.erros.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/coordenadores")
public class CoordenadorController {

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    // 1. Apenas Coordenadores podem listar todos os membros da gestão
    @GetMapping
    @PreAuthorize("hasRole('COORDENADOR')")
    public List<Coordenador> listarTodosAtivos() {
        return coordenadorRepository.findAllByAtivoTrue();
    }

    // 2. Apenas Coordenadores podem buscar os dados de um gestor por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Coordenador> buscarPorId(@PathVariable Long id) {
        Coordenador coordenador = coordenadorRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coordenador não encontrado ou inativo com ID: " + id));
        return ResponseEntity.ok(coordenador);
    }

    // 3. Apenas um Coordenador logado pode cadastrar outro Coordenador
    @PostMapping
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Coordenador> cadastrar(@RequestBody @Valid Coordenador coordenador) {
        coordenador.setRole(Role.ROLE_COORDENADOR); // O sistema garante a Role correta
        coordenador.setAtivo(true);                 // Começa ativo por padrão

        Coordenador salvo = coordenadorRepository.save(coordenador);
        return ResponseEntity.status(201).body(salvo);
    }

    // 4. Apenas Coordenadores podem desativar a conta de outro gestor
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        Coordenador coordenador = coordenadorRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coordenador não encontrado para desativação. ID: " + id));

        coordenador.setAtivo(false);
        coordenadorRepository.save(coordenador);

        return ResponseEntity.noContent().build();
    }
}