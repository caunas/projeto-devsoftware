package com.jpmovel.projetosistemaescolar;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpmovel.projetosistemaescolar.aluno.Aluno;
import com.jpmovel.projetosistemaescolar.coordenador.Coordenador;
import com.jpmovel.projetosistemaescolar.professor.Professor;
import com.jpmovel.projetosistemaescolar.turma.Turma;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class PrimitiveNullDeserializationTests {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void ignoresNullForActiveState() throws Exception {
        assertTrue(objectMapper.readValue("{\"ativo\":null}", Aluno.class).isAtivo());
        assertTrue(objectMapper.readValue("{\"ativo\":null}", Professor.class).isAtivo());
        assertTrue(objectMapper.readValue("{\"ativo\":null}", Coordenador.class).isAtivo());
        assertTrue(objectMapper.readValue("{\"ativo\":null}", Turma.class).isAtivo());
    }
}
