package com.neerajmanivarnan.pricingCalc.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestFromUser {
    String typeName;
    String resourceName;
    int numberOfUnits;
    String instanceType;
    RegionNames regionCode;

}
