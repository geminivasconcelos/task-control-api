package com.alves.task_control.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello-word")
public class HelloWord {

    @GetMapping
    public String helloWord() {
        return "Hello Worldrd!";
    }

}
