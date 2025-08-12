package com.neerajmanivarnan.pricingCalc.models;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestFromUser {

    @NotNull(message = "typeName cannot be null")
    String typeName;

    @NotNull(message = "resourceName cannot be null")
    String resourceName;

    @NotNull(message = "numberOfUnits cannot be null")
    int numberOfUnits;

    @NotNull(message = "instanceType cannot be null")
    String instanceType;

    @NotNull(message = "regionCode cannot be null")
    RegionNames regionCode;

}
