package com.neerajmanivarnan.pricingCalc.service;


import com.neerajmanivarnan.pricingCalc.models.OrderHistory;
import com.neerajmanivarnan.pricingCalc.models.SingleOrder;
import com.neerajmanivarnan.pricingCalc.models.SingleOrderDTO;
import com.neerajmanivarnan.pricingCalc.repo.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepo orderRepo;

    public ResponseEntity<?> findAllOrders() {
        List<OrderHistory> listOfRepos =  orderRepo.findAll();
        return ResponseEntity.ok().body(listOfRepos);
    }

    public ResponseEntity<?> postAnOrder(ArrayList<SingleOrderDTO> singleOrderDTO) {
        List<SingleOrder> singleOrders = new ArrayList<SingleOrder>();

        for(SingleOrderDTO order: singleOrderDTO){
            SingleOrder newOrder = new SingleOrder();
            newOrder.setInstanceType(order.getInstanceType());
            newOrder.setTypeName(order.getTypeName());
            newOrder.setRegionCode(order.getRegionCode());
            newOrder.setTotalCost(order.getTotalCost());
            newOrder.setNumberOfUnits(order.getNumberOfUnits());
            newOrder.setResourceName(order.getResourceName());

            singleOrders.add(newOrder);

        }

        OrderHistory history = new OrderHistory();
        history.setArrayOfOrders(singleOrders);

        orderRepo.save(history);
        return ResponseEntity.ok().body(history);
    }
}
