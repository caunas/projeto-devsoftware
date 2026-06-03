package com.jpmovel.projetosistemaescolar.api.evento;

import com.jpmovel.projetosistemaescolar.api.coordenador.Coordenador;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "eventos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O título do evento é obrigatório")
    @Column(nullable = false, length = 150)
    private String titulo;

    @NotBlank(message = "A descrição do evento é obrigatória")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricao;

    @NotNull(message = "A data e hora do evento são obrigatórias")
    @Column(nullable = false)
    private LocalDateTime dataEvento;

    @Column(length = 100)
    private String local;

    @Column(nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    // RELACIONAMENTO
    @ManyToOne
    @JoinColumn(name = "coordenador_id", nullable = false)
    private Coordenador coordenador;
}