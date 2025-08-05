package com.neerajmanivarnan.pricingCalc.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("home")
public class HomeController {

    @GetMapping("about")
    public String home(){
        return "This is an api ";
    }
}
