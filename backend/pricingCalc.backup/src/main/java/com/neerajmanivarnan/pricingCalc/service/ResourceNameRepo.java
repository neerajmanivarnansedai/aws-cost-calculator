package com.neerajmanivarnan.pricingCalc.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.neerajmanivarnan.pricingCalc.models.ResourceName;

public interface ResourceNameRepo extends JpaRepository<ResourceName,Long>{

}
