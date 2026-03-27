package com.minimarket.backend.dto;

import com.minimarket.backend.model.OrderStatus;

import java.time.LocalDateTime;

public class OrderResponse {

    private Long id;  // changed from orderId → id (standard)
    private Long productId;
    private Integer quantity;
    private Double totalPrice;
    private OrderStatus status;
    private LocalDateTime orderTime;

    // ✅ Constructor
    public OrderResponse(Long id, Long productId, Integer quantity,
                         Double totalPrice, OrderStatus status,
                         LocalDateTime orderTime) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.status = status;
        this.orderTime = orderTime;
    }

    // ✅ Getters
    public Long getId() { return id; }
    public Long getProductId() { return productId; }
    public Integer getQuantity() { return quantity; }
    public Double getTotalPrice() { return totalPrice; }
    public OrderStatus getStatus() { return status; }
    public LocalDateTime getOrderTime() { return orderTime; }

    // ✅ Setters (optional but good practice)
    public void setId(Long id) { this.id = id; }
    public void setProductId(Long productId) { this.productId = productId; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public void setOrderTime(LocalDateTime orderTime) { this.orderTime = orderTime; }
}