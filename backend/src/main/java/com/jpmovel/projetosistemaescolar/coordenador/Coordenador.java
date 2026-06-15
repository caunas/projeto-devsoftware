package com.jpmovel.projetosistemaescolar.coordenador;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.jpmovel.projetosistemaescolar.auth.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "coordenadores")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Coordenador extends Usuario {

    @NotBlank(message = "O setor é obrigatório")
    private String setor;

    @JsonSetter(nulls = Nulls.SKIP)
    private boolean ativo = true;
}
