package com.neerajmanivarnan.pricingCalc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neerajmanivarnan.pricingCalc.models.InstanceType;
import com.neerajmanivarnan.pricingCalc.models.RegionNames;
import com.neerajmanivarnan.pricingCalc.models.RequestFromUser;
import com.neerajmanivarnan.pricingCalc.repo.InstanceTypeRepo;
import com.neerajmanivarnan.pricingCalc.repo.RegionRepo;

@Service
public class ComputeService {


    @Autowired
    InstanceTypeRepo iRepo;

    @Autowired
    RegionRepo regionRepo;

    public Double computeTheCost(RequestFromUser request) {
        RegionNames region = regionRepo.findByRegionCode(request.getRegionCode().getRegionCode());

        if (region == null){
            throw new RuntimeException("Region code not found : "+request.getRegionCode());
        }

        InstanceType typeInDb = iRepo.findByTypeNameAndResourceNameAndInstanceTypeAndRegionCode(request.getTypeName(),request.getResourceName(),request.getInstanceType(),region);
        int numberOfInstances = request.getNumberOfUnits();
        double totalCostPerHour = typeInDb.getPricePerHour();
        Double totalCost = totalCostPerHour * numberOfInstances * 720;

        return totalCost;
    }

}

    // String resourceType;
    // String resourceName;
    // int numberOfUnits;
    // String instanceType;
    // String regionCode;