package com.neerajmanivarnan.pricingCalc.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SingleOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;

    String typeName;
    String resourceName;
    int numberOfUnits;
    String instanceType;
    RegionCode regionCode;
    double totalCost;
}

