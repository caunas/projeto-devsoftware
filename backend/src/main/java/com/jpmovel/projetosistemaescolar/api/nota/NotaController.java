package com.jpmovel.projetosistemaescolar.api.nota;

import com.jpmovel.projetosistemaescolar.api.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.api.aluno.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nota")
public class NotaController {
    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping("")
    public List<Nota> listarPorAluno(@RequestParam Long id_aluno) {
        Aluno aluno = alunoRepository
                .findById(id_aluno)
                .orElseThrow(()
                        -> new RuntimeException("Aluno não encontrado"));
        return notaRepository.findNotasByAluno(aluno);
    }

    @PostMapping("/novo")
    public Nota lancarNota(@RequestParam Long id_aluno, @RequestParam double nota){
        Aluno aluno = alunoRepository
                .findById(id_aluno)
                .orElseThrow(()
                -> new RuntimeException("Aluno não encontrado"));

        Nota novaNota = new Nota();

        novaNota.setNota(nota);
        novaNota.setAluno(aluno);

        return notaRepository.save(novaNota);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> excluirPorId(@PathVariable Long id){
        try {
            Nota nota = notaRepository.findById(id).get();
            notaRepository.delete(nota);
            return ResponseEntity.ok(nota);
        } catch(Exception e){
            return ResponseEntity.status(
                            HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
