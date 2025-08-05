package com.neerajmanivarnan.pricingCalc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neerajmanivarnan.pricingCalc.models.RegionNames;
import com.neerajmanivarnan.pricingCalc.service.RegionService;

@RestController
@RequestMapping("regions")
public class RegionController {

    @Autowired
    RegionService rService; 

    //endpoint to get all regions 
    @GetMapping("getRegions")
   public List<RegionNames>  getAllRegionNames(){
        return rService.getAllRegions(); 
   }
}
