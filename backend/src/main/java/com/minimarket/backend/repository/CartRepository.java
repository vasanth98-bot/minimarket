package com.minimarket.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.minimarket.backend.entity.Cart;
import com.minimarket.backend.model.Product;
import com.minimarket.backend.model.User;
import java.util.List;
import java.util.Optional;


public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUser(User user);

    Optional<Cart> findByUserAndProduct(User user, Product product);


}
