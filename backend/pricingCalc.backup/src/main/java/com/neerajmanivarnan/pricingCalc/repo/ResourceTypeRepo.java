package com.neerajmanivarnan.pricingCalc.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neerajmanivarnan.pricingCalc.models.ResourcesType;

@Repository
public interface ResourceTypeRepo extends JpaRepository<ResourcesType,Long> {
    
} 
