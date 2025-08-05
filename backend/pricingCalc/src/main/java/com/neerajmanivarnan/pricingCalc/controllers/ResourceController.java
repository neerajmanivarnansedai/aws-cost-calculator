package com.neerajmanivarnan.pricingCalc.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neerajmanivarnan.pricingCalc.models.ResourceName;
import com.neerajmanivarnan.pricingCalc.models.ResourcesType;
import com.neerajmanivarnan.pricingCalc.service.ResourceNameService;
import com.neerajmanivarnan.pricingCalc.service.ResourceTypeService;

@RequestMapping("resources")
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ResourceController {

    @Autowired
    ResourceTypeService rService;     

    @Autowired
    ResourceNameService reService;

    //endpoint for resource types - compute, storage , networking
    @GetMapping("/getResources")
    public List<ResourcesType> getResources(){
        List<ResourcesType> numberOfTotalResources = rService.getAllResources();
        return numberOfTotalResources;
    }
    
    //endpoint to get specific resource names  - ec2, fargate, etc..
    @GetMapping("/getSpecificResources")
    public List<ResourceName> getSpecificResources(){
        List<ResourceName> numberOfTotalResources = rService.getAllResourceNames();
        return numberOfTotalResources;
    }
    
    @GetMapping("/getSpecificResources/{currentSelectedResourceType}")
    public List<ResourceName> getSpecificResources(@PathVariable String currentSelectedResourceType){
        List<ResourceName> numberOfTotalResources = reService.getResourceNameBySelected(currentSelectedResourceType);
        return numberOfTotalResources;
    }
}
