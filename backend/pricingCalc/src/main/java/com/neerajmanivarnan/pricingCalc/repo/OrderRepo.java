package com.neerajmanivarnan.pricingCalc.repo;

import com.neerajmanivarnan.pricingCalc.models.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<OrderHistory,Long> {

}
