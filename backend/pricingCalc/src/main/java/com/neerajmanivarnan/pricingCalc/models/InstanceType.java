package com.neerajmanivarnan.pricingCalc.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstanceType {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long Id; 
   private String resourceName;
   private String typeName;
   private String instanceType;

   @ManyToOne
   @JoinColumn(name = "region_name" , nullable = false)
   private RegionNames regionCode ;
   private double pricePerHour;
}
