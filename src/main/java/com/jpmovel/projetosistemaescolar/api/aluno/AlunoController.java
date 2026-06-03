package com.jpmovel.projetosistemaescolar.api.aluno;

import com.jpmovel.projetosistemaescolar.api.erros.ResourceNotFoundException;
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

    //Recomedo outro
    /*
    @GetMapping("{id}")
    public ResponseEntity<? extends Object >buscarPorId(@RequestParam Long id){
        try{
            Optional<Aluno> aluno = alunoRepository.findById(id);
            return ResponseEntity.ok(aluno);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }*/

    //acredito que fica melhor
    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        // Trocado de findAllByAtivoTrue(id) para findByIdAndAtivoTrue(id)
        Aluno aluno = alunoRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno com ID: " + id + " não encontrado ou inativo"));

        return ResponseEntity.ok(aluno);
    }
    //NOVO ALUNO.
    @PostMapping("/novo")
    public Aluno novoAluno(@RequestBody Aluno aluno){
        return alunoRepository.save(aluno);
    }

    //APAGAR ALUNO
    //Retirando para Evitar Problemas com o Banco de Dados
    /*
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
     */
    @DeleteMapping("/deletar/{id}") //acho que não precisa "/deletar" dá uma olhada dps
    public ResponseEntity<Void> excluirPorId(@PathVariable Long id) {
        // 1. Busca o aluno
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Aluno com ID " + id + " não encontrado"));

        // 2. apenas desativamos
        aluno.setAtivo(false);
        alunoRepository.save(aluno);

        // 3. Retornamos 204 No Content (sucesso sem corpo de resposta)
        return ResponseEntity.noContent().build();
    }

}
