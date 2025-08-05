package com.neerajmanivarnan.pricingCalc.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResourcesType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long Id;
    String resourceTypeName;

}
