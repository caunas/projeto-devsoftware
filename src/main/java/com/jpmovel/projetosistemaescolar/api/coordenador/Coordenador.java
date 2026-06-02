package com.jpmovel.projetosistemaescolar.api.coordenador;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "coordenadores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coordenador {

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

    @Column(nullable = false)
    private boolean ativo = true;
}