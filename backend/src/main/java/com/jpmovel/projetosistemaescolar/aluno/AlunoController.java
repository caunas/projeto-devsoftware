package com.jpmovel.projetosistemaescolar.aluno;

import com.jpmovel.projetosistemaescolar.auth.Role;
import com.jpmovel.projetosistemaescolar.erros.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public List<Aluno> listarTodos(){
        return alunoRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR', 'ALUNO')")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        Aluno aluno = alunoRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno com ID: " + id + " não encontrado ou inativo"));

        return ResponseEntity.ok(aluno);
    }

    //Mudança para colocar a Role do aluno quando salvar
    @PostMapping("/novo")
    @PreAuthorize("hasRole('COORDENADOR')")
    public Aluno novoAluno(@RequestBody Aluno aluno){
        aluno.setRole(Role.ROLE_ALUNO); // O sistema preenche sozinho com base no UML
        aluno.setAtivo(true);           // Começa ativo por padrão
        return alunoRepository.save(aluno);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Aluno> atualizar(@PathVariable Long id, @RequestBody Aluno dados) {
        Aluno aluno = alunoRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno com ID " + id + " não encontrado ou inativo"));

        aluno.setNome(dados.getNome());
        aluno.setEmail(dados.getEmail());
        aluno.setMatricula(dados.getMatricula());
        aluno.setCurso(dados.getCurso());
        aluno.setSemestre(dados.getSemestre());
        if (dados.getSenha() != null && !dados.getSenha().isBlank()) {
            aluno.setSenha(dados.getSenha());
        }

        return ResponseEntity.ok(alunoRepository.save(aluno));
    }

    @DeleteMapping("/deletar/{id}")
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Void> excluirPorId(@PathVariable Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno com ID " + id + " não encontrado"));

        aluno.setAtivo(false);
        alunoRepository.save(aluno);

        return ResponseEntity.noContent().build();
    }
}
