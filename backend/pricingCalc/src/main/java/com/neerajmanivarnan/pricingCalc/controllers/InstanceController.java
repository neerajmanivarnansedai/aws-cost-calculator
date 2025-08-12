package com.neerajmanivarnan.pricingCalc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neerajmanivarnan.pricingCalc.exception.valueNullException;
import com.neerajmanivarnan.pricingCalc.service.InstanceTypeService;

@RequestMapping("instance")
@CrossOrigin(origins = "*")
@RestController
public class InstanceController {


    @Autowired
    InstanceTypeService iService;

    @GetMapping("getAllInstances/{resourceName}")
    public ResponseEntity<?> getAllResources(@PathVariable String resourceName){
        if (resourceName == null ) { throw new valueNullException("Null value not accepted");}
        return iService.findByResourceName(resourceName);
    }
    
}
