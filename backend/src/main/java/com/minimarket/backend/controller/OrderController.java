package com.minimarket.backend.controller;

import com.minimarket.backend.dto.OrderResponse;
import com.minimarket.backend.model.Order;
import com.minimarket.backend.model.OrderStatus;
import com.minimarket.backend.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // ✅ Place Order (Only BUYER)
    @PreAuthorize("hasRole('BUYER')")
    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(
            @RequestParam Long productId,
            @RequestParam Integer quantity,
            @RequestParam Double totalPrice,
            Authentication authentication) {

        String buyerEmail = authentication.getName();

        Order order = orderService.createOrder(
                productId,
                buyerEmail,
                quantity,
                totalPrice
        );

        return ResponseEntity.ok(order);
    }

    // ✅ Get My Orders (Only BUYER)
    @PreAuthorize("hasRole('BUYER')")
    @GetMapping("/my-orders")
    public ResponseEntity<Page<OrderResponse>> getMyOrders(
            Authentication authentication,
            Pageable pageable) {

        String buyerEmail = authentication.getName();

        Page<OrderResponse> orders =
                orderService.getBuyerOrders(buyerEmail, pageable);

        return ResponseEntity.ok(orders);
    }

    // ✅ Seller can view all orders
    @PreAuthorize("hasRole('SELLER')")
    @GetMapping("/seller/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // ✅ Seller can update order status
    @PreAuthorize("hasRole('SELLER')")
    @PutMapping("/seller/update-status/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam OrderStatus status) {

        Order updatedOrder = orderService.updateOrderStatus(orderId, status);

        return ResponseEntity.ok(updatedOrder);
    }
}