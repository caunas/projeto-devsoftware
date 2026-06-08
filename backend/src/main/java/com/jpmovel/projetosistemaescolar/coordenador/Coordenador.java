package com.jpmovel.projetosistemaescolar.coordenador;

import com.jpmovel.projetosistemaescolar.usuario.Usuario;
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

    private boolean ativo = true;
}