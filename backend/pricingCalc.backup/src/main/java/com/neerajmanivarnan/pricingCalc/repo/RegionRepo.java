package com.neerajmanivarnan.pricingCalc.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neerajmanivarnan.pricingCalc.models.RegionNames;

@Repository
public interface RegionRepo extends JpaRepository<RegionNames , Long>{

    RegionNames findByRegionCode(String regionCode);

}
