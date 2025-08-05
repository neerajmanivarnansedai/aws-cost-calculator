package com.neerajmanivarnan.pricingCalc.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neerajmanivarnan.pricingCalc.models.ResourceName;

@Repository
public interface ResourceNameRepo extends JpaRepository<ResourceName,Long>{

    List<ResourceName> findByTypeName(String currentSelectedResourceType);

}
