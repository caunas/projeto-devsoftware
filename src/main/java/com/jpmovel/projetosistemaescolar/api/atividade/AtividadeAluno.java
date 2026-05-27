package com.jpmovel.projetosistemaescolar.api.atividade;

import com.jpmovel.projetosistemaescolar.api.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.api.professor.Professor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank(message = "O título da atividade é obrigatório")
    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    private Double nota; // O doble permite começar sem nota

    @Column(nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now(); // Grava a hora que o professor criou

    private LocalDateTime dataEntrega;

    // RELACIONAMENTOS
    //Talvez depois tenha que mudar pra muitos pra muitos

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno; // Vincula a atividade a um Aluno específico

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false)
    private Professor professor; // Vincula ao Professor que criou
}