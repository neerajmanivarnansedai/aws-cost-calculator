package com.neerajmanivarnan.pricingCalc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neerajmanivarnan.pricingCalc.models.InstanceType;
import com.neerajmanivarnan.pricingCalc.models.RegionNames;
import com.neerajmanivarnan.pricingCalc.models.RequestFromUser;
import com.neerajmanivarnan.pricingCalc.models.Response;
import com.neerajmanivarnan.pricingCalc.repo.InstanceTypeRepo;
import com.neerajmanivarnan.pricingCalc.repo.RegionRepo;

@Service
public class ComputeService {


    @Autowired
    InstanceTypeRepo iRepo;

    @Autowired
    RegionRepo regionRepo;

    public Response computeTheCost(RequestFromUser request) {
        // RegionNames region = regionRepo.findByRegionCode(request.getRegionCode().getRegionCode());

        // if (region == null){
        //     throw new IllegalArgumentException("Region code not found : "+request.getRegionCode());
        // }

        InstanceType typeInDb = iRepo.findByDetails(request.getInstanceType(),request.getResourceName(),request.getTypeName(),request.getRegionCode().getRegionCode());

        // if (typeInDb == null) {
        //     return 0.08;
        // }

        
        // InstanceType typeInDb = iRepo.findByTypeNameAndResourceNameAndInstanceTypeAndRegionCode(request.getTypeName(),request.getResourceName(),request.getInstanceType(),region);
        int numberOfInstances = request.getNumberOfUnits();
        double totalCostPerHour = typeInDb.getPricePerHour();
        Double totalCost = totalCostPerHour * numberOfInstances * 720;
        Response result = new Response();
        result.setTotalCost(totalCost);
        return result;
    }

}

// InstanceType findByDetails(@Param("instanceType") String instanceType,@Param("resourceName") String resourceName,@Param("typeName") String typeName,@Param("regionCode") String regionCode);
    // String resourceType;
    // String resourceName;
    // int numberOfUnits;
    // String instanceType;
    // String regionCode;