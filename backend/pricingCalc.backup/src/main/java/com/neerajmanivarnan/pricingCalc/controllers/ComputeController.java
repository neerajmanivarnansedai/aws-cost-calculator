package com.neerajmanivarnan.pricingCalc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neerajmanivarnan.pricingCalc.models.RequestFromUser;
import com.neerajmanivarnan.pricingCalc.service.ComputeService;

@RestController
@RequestMapping("compute")
public class ComputeController {
  
    @Autowired
    ComputeService computeService;

    @PostMapping("computeCurrentInstance")
    public Double computeTheTotalCost(@RequestBody RequestFromUser request){
        return computeService.computeTheCost(request);
    }
}
