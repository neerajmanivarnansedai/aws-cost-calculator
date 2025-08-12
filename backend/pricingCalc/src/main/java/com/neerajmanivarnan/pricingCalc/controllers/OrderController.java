package com.neerajmanivarnan.pricingCalc.controllers;

import com.neerajmanivarnan.pricingCalc.models.OrderHistory;
import com.neerajmanivarnan.pricingCalc.models.SingleOrderDTO;
import com.neerajmanivarnan.pricingCalc.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("api/orders")
@CrossOrigin(origins = "*")
@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("getOrders")
    public ResponseEntity<?> getAllOrders(){
       return orderService.findAllOrders();
    }

    @PostMapping("postAnOrder")
    public ResponseEntity<?> postAnOrder(@RequestBody ArrayList<SingleOrderDTO> singleOrderDTO){
       return orderService.postAnOrder(singleOrderDTO);
    }
    
}
