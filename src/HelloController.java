package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")  // React의 포트 번호
@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public String sayHello() {
        return "Hello from Spring Boot!";
    }
}
