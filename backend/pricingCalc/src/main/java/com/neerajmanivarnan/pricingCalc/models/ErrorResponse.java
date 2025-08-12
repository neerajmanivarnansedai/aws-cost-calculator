package com.neerajmanivarnan.pricingCalc.models;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
   LocalDateTime timestamp; 
   String message;
   int errorCode;
   String path;
}
