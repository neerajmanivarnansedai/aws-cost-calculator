package com.neerajmanivarnan.pricingCalc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neerajmanivarnan.pricingCalc.models.ResourceName;
import com.neerajmanivarnan.pricingCalc.repo.ResourceNameRepo;

@Service
public class ResourceNameService {


    @Autowired
    ResourceNameRepo rRepo;

    public List<ResourceName> getResourceNameBySelected(String currentSelectedResourceType) {
       return rRepo.findByTypeName(currentSelectedResourceType);
    }
    
}
