package com.neerajmanivarnan.pricingCalc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neerajmanivarnan.pricingCalc.service.InstanceTypeService;

@RequestMapping("instance")
@CrossOrigin(origins = "*")
@RestController
public class InstanceController {


    @Autowired
    InstanceTypeService iService;

    @GetMapping("getAllInstances/{resourceName}")
    public List<String> getAllResources(@PathVariable String resourceName){
        return iService.findByResourceName(resourceName);
    }
    
}
