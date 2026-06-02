package com.jpmovel.projetosistemaescolar.api.aluno;

import com.jpmovel.projetosistemaescolar.api.turma.Turma; // Importando a nova classe
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "alunos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome não pode estar em branco")
    @Column(nullable = false, length = 150)
    private String nome;

    @NotBlank(message = "Matricula é obrigatória")
    @Column(nullable = false, length = 20, unique = true)
    private String matricula;

    @Column(nullable = false)
    private boolean ativo = true;

    @ManyToOne
    @JoinColumn(name = "turma_id")
    private Turma turma;
}