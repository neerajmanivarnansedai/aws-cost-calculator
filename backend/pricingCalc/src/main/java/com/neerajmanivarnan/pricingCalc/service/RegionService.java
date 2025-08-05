package com.neerajmanivarnan.pricingCalc.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neerajmanivarnan.pricingCalc.models.RegionNames;
import com.neerajmanivarnan.pricingCalc.repo.RegionRepo;

@Service
public class RegionService {

    @Autowired
    RegionRepo rRepo;

    public List<RegionNames> getAllRegions() {
        return rRepo.findAll();
    }

}
