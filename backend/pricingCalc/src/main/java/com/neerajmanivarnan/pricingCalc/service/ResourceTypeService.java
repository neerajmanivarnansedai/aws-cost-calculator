package com.neerajmanivarnan.pricingCalc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neerajmanivarnan.pricingCalc.models.ResourceName;
import com.neerajmanivarnan.pricingCalc.models.ResourcesType;
import com.neerajmanivarnan.pricingCalc.repo.ResourceTypeRepo;

@Service
public class ResourceTypeService {

    @Autowired
    ResourceTypeRepo rRepo;

    @Autowired
    ResourceNameRepo rName;

    public List<ResourcesType> getAllResources() {
        return rRepo.findAll();
    }
   
    public List<ResourceName> getAllResourceNames(){
        return rName.findAll();
    }
}
