package com.neerajmanivarnan.pricingCalc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.neerajmanivarnan.pricingCalc.exception.ResourceNotFoundException;
import com.neerajmanivarnan.pricingCalc.repo.InstanceTypeRepo;

@Service
public class InstanceTypeService {
   
    @Autowired
    InstanceTypeRepo iRepo;

    public List<String> findRegionCodeBySelectedResourceName(String selectedResourceName,String selectedInstanceType) {
       return iRepo.findRegionCodesBySelectedResourceName(selectedResourceName,selectedInstanceType);
    }
  
    public ResponseEntity<?> findByResourceName(String resourceName){
        List<String> newInstanceType = iRepo.findByResourceName(resourceName);

        if (newInstanceType.isEmpty()){
            throw new ResourceNotFoundException("Resource Name with : "+ resourceName + " not found");
        }

        return ResponseEntity.status(HttpStatus.OK).body(newInstanceType);
    }

}
