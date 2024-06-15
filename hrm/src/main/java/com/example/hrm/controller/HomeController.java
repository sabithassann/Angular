package com.example.hrm.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HomeController {

    @GetMapping("/home")
    public String home(){
        return "This is home page";
    }

    @GetMapping("/admin")
    public String admin(){
        return "This is Main admin page";
    }

    @GetMapping("/admin/page")
    public String admin1(){
        return "This is  admin Sub page";
    }

    @GetMapping("/user")
    public String user(){
        return "This is Main User page";
    }

    @GetMapping("/user/page")
    public String user1(){
        return "This is  User Sub page";
    }

}
