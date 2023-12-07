package com.sabit.SpringBoot55.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

@RequestMapping("/students")
public class StudentController {
    @GetMapping("")
    public String allStudent(){
        return "student";
    }

    @GetMapping("/mamun")

    public String mamun(){
        return "mamun";
    }
}
