package com.neerajmanivarnan.pricingCalc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neerajmanivarnan.pricingCalc.models.RegionNames;
import com.neerajmanivarnan.pricingCalc.service.InstanceTypeService;
import com.neerajmanivarnan.pricingCalc.service.RegionService;

@RequestMapping("/regions")
@CrossOrigin(origins = "*")
@RestController
public class RegionController {

    @Autowired
    RegionService rService; 

     @Autowired
     InstanceTypeService iService;

    //endpoint to get all regions 
    @GetMapping("getRegions")
   public List<RegionNames>  getAllRegionNames(){
        return rService.getAllRegions(); 
   }

   @GetMapping("/getregionByResource/{selectedResourceName}")
   public List<String> getAllRegionsForeignKey(@PathVariable String selectedResourceName){
     return iService.findRegionCodeBySelectedResourceName(selectedResourceName);

   }
}
