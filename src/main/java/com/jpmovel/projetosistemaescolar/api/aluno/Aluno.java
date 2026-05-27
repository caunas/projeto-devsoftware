package com.jpmovel.projetosistemaescolar.api.aluno;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Table(name = "aluno")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome não pode estar em branco")
    @Column(nullable = false, length = 150)
    private String nome;

    @NotBlank(message = "Matricula é obrigatoria")
    @Column (nullable = false, length = 20, unique = true)
    private String matricula;

    @NotBlank(message = "A turma é obrigatória")
    @Column(nullable = false, length = 20)
    private String turma;

    @Column(nullable = false)
    private boolean ativo = true;
}
