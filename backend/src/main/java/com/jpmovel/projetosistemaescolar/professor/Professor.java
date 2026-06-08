package com.jpmovel.projetosistemaescolar.professor;

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
    private String Black; // ou especialidade

    private boolean ativo = true;
}