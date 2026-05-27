package com.jpmovel.projetosistemaescolar.api.nota;

import com.jpmovel.projetosistemaescolar.api.aluno.Aluno;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "nota")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Aluno aluno;

    private double nota;
}
