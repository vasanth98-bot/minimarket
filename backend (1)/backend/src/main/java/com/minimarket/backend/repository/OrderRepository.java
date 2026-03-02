package com.minimarket.backend.repository;

import com.minimarket.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface OrderRepository extends JpaRepository<Order, Long> {

   Page<Order> findByBuyerEmail(String buyerEmail, Pageable pageable);
}
