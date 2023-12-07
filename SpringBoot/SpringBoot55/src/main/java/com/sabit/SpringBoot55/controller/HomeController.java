package com.sabit.SpringBoot55.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
   @GetMapping("/")
    public String home(){
        return "home";
    }
    @GetMapping("/mamun")
    public String mamun(){
       return "mamun";
    }

    @GetMapping("/sabit")

    public String sabit(){
       return "sabit";
    }




    @GetMapping(value = {"/sabit", "/abc"})
    public String sabit1(){
       return "sabit";
    }
}
