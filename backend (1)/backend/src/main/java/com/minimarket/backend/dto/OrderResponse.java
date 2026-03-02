package com.minimarket.backend.dto;

import com.minimarket.backend.model.OrderStatus;

import java.time.LocalDateTime;

public class OrderResponse {

    private Long orderId;
    private Long productId;
    private Integer quantity;
    private Double totalPrice;
    private OrderStatus status;
    private LocalDateTime orderTime;

    public OrderResponse(Long orderId, Long productId, Integer quantity,
                         Double totalPrice, OrderStatus status,
                         LocalDateTime orderTime) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.status = status;
        this.orderTime = orderTime;
    }

    public Long getOrderId() { return orderId; }
    public Long getProductId() { return productId; }
    public Integer getQuantity() { return quantity; }
    public Double getTotalPrice() { return totalPrice; }
    public OrderStatus getStatus() { return status; }
    public LocalDateTime getOrderTime() { return orderTime; }
}

