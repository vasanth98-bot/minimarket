package com.minimarket.backend.repository;

import com.minimarket.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCase(String keyword);

    List<Product> findBySellerId(Long sellerId);

    // ✅ Correct way to query by seller email
    List<Product> findBySeller_Email(String email);
}