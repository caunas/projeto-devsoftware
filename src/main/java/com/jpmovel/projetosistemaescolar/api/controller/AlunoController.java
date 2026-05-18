package com.jpmovel.projetosistemaescolar.api.controller;

import com.jpmovel.projetosistemaescolar.api.domain.Aluno;
import com.jpmovel.projetosistemaescolar.api.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping
    public List<Aluno> listarTodos(){
        return alunoRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<? extends Object >buscarPorId(@RequestParam Long id){
        try{
            Optional<Aluno> aluno = alunoRepository.findById(id);
            return ResponseEntity.ok(aluno);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/novo")
    public Aluno novoAluno(@RequestBody Aluno aluno){
        return alunoRepository.save(aluno);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> excluirPorId(@PathVariable Long id){
        try {
            Aluno aluno = alunoRepository.findById(id).get();
            alunoRepository.delete(aluno);
            return ResponseEntity.ok(aluno);
        } catch(Exception e){
            return ResponseEntity.status(
                    HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

}
