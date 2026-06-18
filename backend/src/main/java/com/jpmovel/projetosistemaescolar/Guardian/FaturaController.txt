package com.jpmovel.projetosistemaescolar.fatura;

import com.jpmovel.projetosistemaescolar.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.aluno.AlunoRepository;
import com.jpmovel.projetosistemaescolar.erros.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/faturas")
public class FaturaController {

    @Autowired
    private FaturaRepository faturaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping
    @PreAuthorize("hasRole('COORDENADOR')")
    public List<Fatura> listarTodas() {
        return faturaRepository.findAll();
    }

    // 1. Apenas o COORDENADOR (ou setor financeiro) gera cobranças
    @PostMapping
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Fatura> gerarFatura(@RequestBody @Valid Fatura fatura) {
        // Valida se o aluno existe e está ativo na escola
        Aluno aluno = alunoRepository.findByIdAndAtivoTrue(fatura.getAluno().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado ou inativo para gerar cobrança."));

        fatura.setAluno(aluno);
        fatura.setStatus("PENDENTE"); // Garante que começa pendente

        Fatura novaFatura = faturaRepository.save(fatura);
        return ResponseEntity.status(201).body(novaFatura);
    }

    // 2. Apenas o COORDENADOR dá baixa ou confirma o pagamento da fatura
    @PatchMapping("/{id}/pagar")
    @PreAuthorize("hasRole('COORDENADOR')")
    public ResponseEntity<Fatura> pagarFatura(@PathVariable Long id) {
        Fatura fatura = faturaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fatura não encontrada com ID: " + id));

        if ("PAGO".equals(fatura.getStatus())) {
            throw new IllegalStateException("Esta fatura já foi paga anteriormente.");
        }

        // Atualiza os dados do pagamento
        fatura.setStatus("PAGO");
        fatura.setDataPagamento(LocalDate.now()); // Registra o dia exato do pagamento

        Fatura faturaPaga = faturaRepository.save(fatura);
        return ResponseEntity.ok(faturaPaga);
    }

    // 3. O ALUNO vê as suas próprias faturas e o COORDENADOR consulta o histórico geral
    @GetMapping("/aluno/{alunoId}")
    @PreAuthorize("hasAnyRole('COORDENADOR', 'ALUNO')")
    public ResponseEntity<List<Fatura>> listarPorAluno(@PathVariable Long alunoId) {
        List<Fatura> faturas = faturaRepository.findByAlunoId(alunoId);
        return ResponseEntity.ok(faturas);
    }
}
