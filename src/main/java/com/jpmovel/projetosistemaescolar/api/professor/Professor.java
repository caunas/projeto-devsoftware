package com.jpmovel.projetosistemaescolar.api.professor;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "professores") // Plural é uma convenção comum para tabelas
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    @Column(nullable = false, length = 150)
    private String nome;

    @NotBlank(message = "A matrícula é obrigatória")
    @Column(unique = true, nullable = false, length = 20)
    private String matricula;

    @Email(message = "E-mail inválido")
    @Column(unique = true)
    private String email;

    private boolean ativo = true;


    // @OneToMany(mappedBy = "professor")
    // private List<Disciplina> disciplinas;
}
