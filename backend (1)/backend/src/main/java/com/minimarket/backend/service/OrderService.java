package com.minimarket.backend.service;

import com.minimarket.backend.dto.OrderResponse;
import com.minimarket.backend.model.Order;
import com.minimarket.backend.model.OrderStatus;
import com.minimarket.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // ✅ CREATE ORDER
    public Order createOrder(Long productId, String buyerEmail, Integer quantity, Double totalPrice) {

        Order order = new Order();

        order.setProductId(productId);
        order.setBuyerEmail(buyerEmail);
        order.setQuantity(quantity);
        order.setTotalPrice(totalPrice);
        order.setOrderTime(LocalDateTime.now());

        // 🔥 ADD THIS HERE
        order.setStatus(OrderStatus.PLACED);

        return orderRepository.save(order);
    }

    // ✅ GET BUYER ORDERS
    public Page<OrderResponse> getBuyerOrders(String buyerEmail, Pageable pageable) {

    return orderRepository.findByBuyerEmail(buyerEmail, pageable)
            .map(order -> new OrderResponse(
                    order.getId(),
                    order.getProductId(),
                    order.getQuantity(),
                    order.getTotalPrice(),
                    order.getStatus(),
                    order.getOrderTime()
            ));
}



            // ✅ UPDATE STATUS (Admin)
            public Order updateOrderStatus(Long orderId, OrderStatus status) {

                Order order = orderRepository.findById(orderId)
                        .orElseThrow(() -> new RuntimeException("Order not found"));

                order.setStatus(status);

                return orderRepository.save(order);
            }

            // ✅ GET ALL ORDERS
            public List<Order> getAllOrders() {
                return orderRepository.findAll();
            }
}
