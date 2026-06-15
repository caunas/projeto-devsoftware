package com.jpmovel.projetosistemaescolar.admin;

import com.jpmovel.projetosistemaescolar.auth.Role;
import com.jpmovel.projetosistemaescolar.coordenador.Coordenador;
import com.jpmovel.projetosistemaescolar.coordenador.CoordenadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @Override
    public void run(String... args){

        boolean adminExists = coordenadorRepository.findByEmail("admin@sistema.local").isPresent();

        if (adminExists){
            return;
        }

        Coordenador admin = new Coordenador();

        admin.setNome("Admin");
        admin.setEmail("admin@sistema.local");
        admin.setSenha("admin123"); // PQP, ALTERAR PARA INPROD
        admin.setSetor("T.I");
        admin.setRole(Role.ROLE_COORDENADOR);

        coordenadorRepository.save(admin);

        System.out.println(">>> DEFAULT ADMIN CREATED!");
    }
}
