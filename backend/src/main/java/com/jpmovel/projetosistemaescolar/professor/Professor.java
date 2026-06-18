package com.jpmovel.projetosistemaescolar.professor;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.jpmovel.projetosistemaescolar.auth.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "professores")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Professor extends Usuario {

    @NotBlank(message = "O departamento é obrigatório")
    private String departamento;

    @NotBlank(message = "A especialidade é obrigatória")
    @Column(name = "black")
    private String especialidade;

    @JsonSetter(nulls = Nulls.SKIP)
    private boolean ativo = true;
}
