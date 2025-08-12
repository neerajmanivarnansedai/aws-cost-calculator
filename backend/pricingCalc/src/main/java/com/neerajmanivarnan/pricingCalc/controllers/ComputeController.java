package com.neerajmanivarnan.pricingCalc.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neerajmanivarnan.pricingCalc.models.RequestFromUser;
import com.neerajmanivarnan.pricingCalc.models.Response;
import com.neerajmanivarnan.pricingCalc.service.ComputeService;

@RequestMapping("compute")
@CrossOrigin(origins = "*")
@RestController
public class ComputeController {
  
    @Autowired
    ComputeService computeService;

    @PostMapping("computeCurrentInstance")
    public Response computeTheTotalCost(@Valid @RequestBody RequestFromUser request){
        return computeService.computeTheCost(request);
    }
}
