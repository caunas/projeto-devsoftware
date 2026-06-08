package com.jpmovel.projetosistemaescolar.api.aluno;

import com.jpmovel.projetosistemaescolar.api.usuario.Usuario;
import com.jpmovel.projetosistemaescolar.api.turma.Turma;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "alunos")
@Data
@EqualsAndHashCode(callSuper = true) // Importante para o Lombok lidar com herança
@NoArgsConstructor
@AllArgsConstructor
public class Aluno extends Usuario {

    @NotBlank(message = "Matrícula é obrigatória")
    @Column(nullable = false, length = 20, unique = true)
    private String matricula;

    @NotBlank(message = "O curso é obrigatório")
    private String curso;

    private int semestre;

    private boolean ativo = true;

    // Ajustado para @ManyToMany conforme o diagrama (* <-> *)
    @ManyToMany(mappedBy = "alunos")
    private Set<Turma> turmas = new HashSet<>();
}