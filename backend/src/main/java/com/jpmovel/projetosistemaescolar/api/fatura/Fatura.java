package com.jpmovel.projetosistemaescolar.api.fatura;

import com.jpmovel.projetosistemaescolar.api.aluno.Aluno;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "faturas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "O valor da fatura é obrigatório")
    @Column(nullable = false)
    private Double valor;

    @NotBlank(message = "O mês de referência é obrigatório (ex: Janeiro/2026)")
    @Column(nullable = false, length = 20)
    private String mesReferencia;

    @NotNull(message = "A data de vencimento é obrigatória")
    @Column(nullable = false)
    private LocalDate dataVencimento;

    private LocalDate dataPagamento; // Fica null até o aluno pagar

    @Column(nullable = false, length = 20)
    private String status = "PENDENTE"; // PENDENTE, PAGO, ATRASADO

    // RELACIONAMENTO: A fatura pertence a um Aluno
    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;
}