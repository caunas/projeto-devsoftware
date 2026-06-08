package com.jpmovel.projetosistemaescolar.aluno;

import com.jpmovel.projetosistemaescolar.usuario.Role;
import com.jpmovel.projetosistemaescolar.erros.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping
    public List<Aluno> listarTodos(){
        return alunoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        Aluno aluno = alunoRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno com ID: " + id + " não encontrado ou inativo"));

        return ResponseEntity.ok(aluno);
    }

    //Mudança para colocar a Role do aluno quando salvar
    @PostMapping("/novo")
    public Aluno novoAluno(@RequestBody Aluno aluno){
        aluno.setRole(Role.ROLE_ALUNO); // O sistema preenche sozinho com base no UML
        aluno.setAtivo(true);           // Começa ativo por padrão
        return alunoRepository.save(aluno);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Void> excluirPorId(@PathVariable Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno com ID " + id + " não encontrado"));

        aluno.setAtivo(false);
        alunoRepository.save(aluno);

        return ResponseEntity.noContent().build();
    }
}