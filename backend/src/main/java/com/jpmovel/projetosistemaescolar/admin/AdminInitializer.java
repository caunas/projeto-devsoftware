package com.jpmovel.projetosistemaescolar.admin;

import com.jpmovel.projetosistemaescolar.auth.Role;
import com.jpmovel.projetosistemaescolar.coordenador.Coordenador;
import com.jpmovel.projetosistemaescolar.coordenador.CoordenadorRepository;
import com.jpmovel.projetosistemaescolar.professor.Professor;
import com.jpmovel.projetosistemaescolar.professor.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Override
    public void run(String... args){

        boolean adminExists = coordenadorRepository.findByEmail("admin@sistema.local").isPresent();

        if (!adminExists){
            Coordenador admin = new Coordenador();

            admin.setNome("Admin");
            admin.setEmail("admin@sistema.local");
            admin.setSenha("admin123");
            admin.setSetor("T.I");
            admin.setRole(Role.ROLE_COORDENADOR);

            coordenadorRepository.save(admin);
            System.out.println(">>> DEFAULT ADMIN CREATED!");
        }

        boolean professorExists = professorRepository.findAll().stream()
                .anyMatch(professor -> "professor@sistema.local".equals(professor.getEmail()));

        if (!professorExists) {
            Professor professor = new Professor();

            professor.setNome("Professor Padrao");
            professor.setEmail("professor@sistema.local");
            professor.setSenha("professor123");
            professor.setDepartamento("Tecnologia");
            professor.setEspecialidade("Engenharia de Software");
            professor.setRole(Role.ROLE_PROFESSOR);
            professor.setAtivo(true);

            professorRepository.save(professor);
            System.out.println(">>> DEFAULT PROFESSOR CREATED!");
        }
    }
}
