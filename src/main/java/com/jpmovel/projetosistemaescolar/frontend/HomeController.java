package com.jpmovel.projetosistemaescolar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/login")
    public String logar(){
        System.out.println("ROTA DE LOGIN");
        return "login";
    }


    @GetMapping("/")
    public String home(){
        return "inicioAluno";
    }
}
