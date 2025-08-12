package com.neerajmanivarnan.pricingCalc.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SingleOrderDTO {

    String typeName;
    String resourceName;
    int numberOfUnits;
    String instanceType;
    RegionCode regionCode;
    double totalCost;
}
