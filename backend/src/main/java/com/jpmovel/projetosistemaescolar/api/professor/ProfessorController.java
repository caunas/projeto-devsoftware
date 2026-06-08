package com.jpmovel.projetosistemaescolar.api.professor;

import com.jpmovel.projetosistemaescolar.api.erros.ResourceNotFoundException; // Ajuste o pacote se necessário
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping("/professores")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public List<Professor> listarTodosAtivos() {
        return professorRepository.findAllByAtivoTrue();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> buscarPorId(@PathVariable Long id) {
        Professor professor = professorRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado ou inativo com ID: " + id));
        return ResponseEntity.ok(professor);
    }

    @PostMapping
    public ResponseEntity<Professor> cadastrar(@RequestBody @Valid Professor professor) {
        Professor salvo = professorRepository.save(professor);
        return ResponseEntity.status(201).body(salvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        Professor professor = professorRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado para desativação. ID: " + id));

        professor.setAtivo(false);
        professorRepository.save(professor);

        return ResponseEntity.noContent().build();
    }
}