package com.jpmovel.projetosistemaescolar.api.coordenador;

import com.jpmovel.projetosistemaescolar.api.erros.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coordenadores")
public class CoordenadorController {

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @GetMapping
    public List<Coordenador> listarTodosAtivos() {
        return coordenadorRepository.findAllByAtivoTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coordenador> buscarPorId(@PathVariable Long id) {
        Coordenador coordenador = coordenadorRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coordenador não encontrado ou inativo com ID: " + id));
        return ResponseEntity.ok(coordenador);
    }

    @PostMapping
    public ResponseEntity<Coordenador> cadastrar(@RequestBody @Valid Coordenador coordenador) {
        Coordenador salvo = coordenadorRepository.save(coordenador);
        return ResponseEntity.status(201).body(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        Coordenador coordenador = coordenadorRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coordenador não encontrado para desativação. ID: " + id));

        coordenador.setAtivo(false);
        coordenadorRepository.save(coordenador);

        return ResponseEntity.noContent().build();
    }
}