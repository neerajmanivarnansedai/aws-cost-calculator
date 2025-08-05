package com.neerajmanivarnan.pricingCalc.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neerajmanivarnan.pricingCalc.models.InstanceType;
import com.neerajmanivarnan.pricingCalc.models.RegionNames;

@Repository
public interface InstanceTypeRepo extends JpaRepository<InstanceType,Long>{

    InstanceType findByTypeNameAndResourceNameAndInstanceTypeAndRegionCode(String typeName, String resourceName,
            String instanceType, RegionNames regionCode);

}

//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long Id; 
//    private String resourceName;
//    private String typeName;
//    private String instanceType;

//    @ManyToOne
//    @JoinColumn(name = "region_name" , nullable = false)
//    private RegionNames regionCode ;
//    private double pricePerHour;