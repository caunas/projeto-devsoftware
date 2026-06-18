package com.jpmovel.projetosistemaescolar;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.jpmovel.projetosistemaescolar.atividade.Atividade;
import com.jpmovel.projetosistemaescolar.evento.Evento;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class CreationDateDeserializationTests {

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @Test
    void ignoresNullCreationDateFromRequest() throws Exception {
        Atividade atividade = objectMapper.readValue("{\"dataCriacao\":null}", Atividade.class);
        Evento evento = objectMapper.readValue("{\"dataCriacao\":null}", Evento.class);

        assertNotNull(atividade.getDataCriacao());
        assertNotNull(evento.getDataCriacao());
    }
}
