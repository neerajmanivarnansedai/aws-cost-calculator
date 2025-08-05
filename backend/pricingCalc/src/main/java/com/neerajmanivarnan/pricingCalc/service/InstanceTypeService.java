package com.neerajmanivarnan.pricingCalc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neerajmanivarnan.pricingCalc.repo.InstanceTypeRepo;

@Service
public class InstanceTypeService {
   
    @Autowired
    InstanceTypeRepo iRepo;

    public List<String> findRegionCodeBySelectedResourceName(String selectedResourceName) {
       return iRepo.findRegionCodesBySelectedResourceName(selectedResourceName);
    }
  
    public List<String> findByResourceName(String resourceName){
        return iRepo.findByResourceName(resourceName);
    }

}
