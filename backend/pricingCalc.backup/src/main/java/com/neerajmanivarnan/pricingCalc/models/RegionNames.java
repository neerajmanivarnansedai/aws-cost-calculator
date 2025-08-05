package com.neerajmanivarnan.pricingCalc.models;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegionNames {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long Id;
   @Column(name = "region_code", unique = true, nullable = false)
   private String regionCode; 

   @OneToMany(mappedBy = "regionCode")
   private List<InstanceType> instanceTypes;
}
