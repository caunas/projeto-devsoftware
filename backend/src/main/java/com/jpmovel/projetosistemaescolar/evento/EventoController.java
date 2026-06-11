package com.jpmovel.projetosistemaescolar.evento;

import com.jpmovel.projetosistemaescolar.coordenador.Coordenador;
import com.jpmovel.projetosistemaescolar.coordenador.CoordenadorRepository;
import com.jpmovel.projetosistemaescolar.erros.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/eventos")
public class EventoController {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    // 1. PORTAL PÚBLICO: Sem @PreAuthorize para permitir acesso de qualquer visitante
    @GetMapping
    public List<Evento> listarTodos() {
        return eventoRepository.findAllByOrderByDataEventoAsc();
    }

    // 2. PORTAL PÚBLICO: Sem @PreAuthorize para permitir acesso de qualquer visitante
    @GetMapping("/{id}")
    public ResponseEntity<Evento> buscarPorId(@PathVariable Long id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado com ID: " + id));
        return ResponseEntity.ok(evento);
    }

    // 3. Cria um novo evento no mural é Exclusivo do coordenador
    @PostMapping
    @PreAuthorize("hasRole('COORDENADOR')") // 🔐 Apenas coordenador cria
    public ResponseEntity<Evento> criarEvento(@RequestBody @Valid Evento evento) {
        // Valida se o coordenador que está criando o evento existe e está ativo
        Coordenador coordenador = coordenadorRepository.findByIdAndAtivoTrue(evento.getCoordenador().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Coordenador responsável não encontrado ou inativo"));

        evento.setCoordenador(coordenador);
        Evento salvo = eventoRepository.save(evento);

        return ResponseEntity.status(201).body(salvo);
    }

    // 4. Remove um evento do mural Exclusivo do coordenador
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COORDENADOR')") // 🔐 Apenas coordenador deleta
    public ResponseEntity<Void> excluirEvento(@PathVariable Long id) {
        if (!eventoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Evento não encontrado para exclusão. ID: " + id);
        }
        eventoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}