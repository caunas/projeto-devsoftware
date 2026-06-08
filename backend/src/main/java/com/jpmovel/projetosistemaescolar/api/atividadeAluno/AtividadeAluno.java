package com.jpmovel.projetosistemaescolar.api.atividadeAluno;

import com.jpmovel.projetosistemaescolar.api.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.api.atividade.Atividade;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "atividades_alunos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AtividadeAluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "atividade_id", nullable = false)
    private Atividade atividade;

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @Column(columnDefinition = "TEXT")
    private String resposta;

    private Double nota;

    private LocalDateTime dataEntrega;
}