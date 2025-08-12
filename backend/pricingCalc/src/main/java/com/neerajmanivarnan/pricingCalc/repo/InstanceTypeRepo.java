package com.neerajmanivarnan.pricingCalc.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.neerajmanivarnan.pricingCalc.models.InstanceType;
import com.neerajmanivarnan.pricingCalc.models.RegionNames;

@Repository
public interface InstanceTypeRepo extends JpaRepository<InstanceType,Long>{

    InstanceType findByTypeNameAndResourceNameAndInstanceTypeAndRegionCode(String typeName, String resourceName,
            String instanceType, RegionNames regionCode);

    // @Query("SELECT r.regionCde FROM InstanceType i JOIN i.regionName r WHERE i.resourceName = :selectedResourceName")
    // List<String> findRegionCodesBySelectedResourceName(@Param("selectedResourceName") String selectedResourceName);


      @Query(value = "SELECT rn.region_code " +
                   "FROM region_names rn " +
                   "WHERE rn.id IN (" +
                   "    SELECT it.region_name " +
                   "    FROM instance_type it " +
                   "    WHERE it.resource_name = :selectedResourceName" +
                   " AND it.instance_type = :selectedInstanceType" +
                   ")", nativeQuery = true)
    List<String> findRegionCodesBySelectedResourceName(@Param("selectedResourceName") String selectedResourceName, @Param("selectedInstanceType") String selectedInstanceType);


      @Query("select it.instanceType from InstanceType it where it.resourceName = :resourceName")
      List<String> findByResourceName(@Param("resourceName") String resourceName);



    @Query(value = "SELECT * FROM instance_type " +
               "WHERE instance_type = :instanceType " +
               "AND resource_name = :resourceName " +
               "AND type_name = :typeName " +
               "AND region_name = (SELECT id FROM region_names WHERE region_code = :regionCode)",
       nativeQuery = true)
        InstanceType findByDetails(@Param("instanceType") String instanceType,@Param("resourceName") String resourceName,@Param("typeName") String typeName,@Param("regionCode") String regionCode);


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