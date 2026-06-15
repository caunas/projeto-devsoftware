package com.jpmovel.projetosistemaescolar.turma;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.jpmovel.projetosistemaescolar.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.professor.Professor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "turmas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome da turma é obrigatório (ex: 3º Ano A)")
    @Column(nullable = false, unique = true, length = 50)
    private String nome;

    @JsonSetter(nulls = Nulls.SKIP)
    private boolean ativo = true;

    // Relacionamento Muitos para Muitos com Professor
    // Uma turma tem vários professores e um professor tem várias turmas
    @ManyToMany
    @JoinTable(
            name = "turma_professor",
            joinColumns = @JoinColumn(name = "turma_id"),
            inverseJoinColumns = @JoinColumn(name = "professor_id")
    )
    private Set<Professor> professores = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "turma_aluno",
            joinColumns = @JoinColumn(name = "turma_id"),
            inverseJoinColumns = @JoinColumn(name = "aluno_id")
    )
    private Set<Aluno> alunos = new HashSet<>();
}
