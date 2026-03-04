package com.minimarket.backend.entity;

import jakarta.persistence.*;
import com.minimarket.backend.model.User;
import com.minimarket.backend.model.Product;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Product product;

    private int quantity;
    public void setUser(User user) {
    this.user = user;
}

    public void setProduct(Product product) {
    this.product = product;
}

    public void setQuantity(int quantity) {
    this.quantity = quantity;
}

    public User getUser() {
    return user;
}

    public Product getProduct() {
    return product;
}

    public int getQuantity() {
    return quantity;
}

}
