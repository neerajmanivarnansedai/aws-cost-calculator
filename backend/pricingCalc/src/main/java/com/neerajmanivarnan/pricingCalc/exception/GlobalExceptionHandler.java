package com.neerajmanivarnan.pricingCalc.exception;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.neerajmanivarnan.pricingCalc.models.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex,HttpServletRequest servlet){
        ErrorResponse reponse = new ErrorResponse();
        reponse.setErrorCode(404);
        reponse.setMessage(ex.getMessage());
        reponse.setPath(servlet.getRequestURI());
        reponse.setTimestamp(LocalDateTime.now());

        return ResponseEntity.status(404).body(reponse);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAnyException(Exception ex,HttpServletRequest servlet){
        ErrorResponse reponse = new ErrorResponse();
        reponse.setErrorCode(507);
        reponse.setMessage(ex.getMessage());
        reponse.setPath(servlet.getRequestURI());
        reponse.setTimestamp(LocalDateTime.now());

        return ResponseEntity.status(507).body(reponse);
    }


}
