package com.jpmovel.projetosistemaescolar.nota;

import com.jpmovel.projetosistemaescolar.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.aluno.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize; // 👈 IMPORT OBRIGATÓRIO

import java.util.List;

@RestController
@RequestMapping("/api/nota")
public class NotaController {

    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping("/todas")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public List<Nota> listarTodas() {
        return notaRepository.findAll();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
    public ResponseEntity<Nota> atualizar(@PathVariable Long id, @RequestParam double nota) {
        Nota registro = notaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota não encontrada"));
        registro.setNota(nota);
        return ResponseEntity.ok(notaRepository.save(registro));
    }

    // 1. Alunos (ver boletim), Professores e Coordenadores podem listar as notas
    @GetMapping("")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR', 'ALUNO')")
    public List<Nota> listarPorAluno(@RequestParam Long id_aluno) {
        Aluno aluno = alunoRepository
                .findById(id_aluno)
                .orElseThrow(()
                        -> new RuntimeException("Aluno não encontrado"));
        return notaRepository.findNotasByAluno(aluno);
    }

    // 2. Apenas PROFESSOR e COORDENADOR podem lançar notas no sistema
    @PostMapping("/novo")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
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

    // 3. Apenas o COORDENADOR pode deletar um registro de nota do histórico
    @DeleteMapping("/deletar/{id}")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'PROFESSOR')")
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
