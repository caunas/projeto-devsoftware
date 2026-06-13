package com.jpmovel.projetosistemaescolar.atividade;

import com.jpmovel.projetosistemaescolar.professor.Professor;
import com.jpmovel.projetosistemaescolar.turma.Turma;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "atividades")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Atividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O título da atividade é obrigatório")
    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    private LocalDateTime dataLimiteEntrega;

    // RELACIONAMENTOS
    @ManyToOne
    @JoinColumn(name = "turma_id", nullable = false)
    private Turma turma; // O professor passa para a TURMA inteira

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false)
    private Professor professor;
}