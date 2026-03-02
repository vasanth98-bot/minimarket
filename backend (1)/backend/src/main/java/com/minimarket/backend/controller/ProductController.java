package com.minimarket.backend.controller;

import com.minimarket.backend.model.Product;
import com.minimarket.backend.model.User;
import com.minimarket.backend.service.ProductService;
import com.minimarket.backend.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductService productService;
    private final UserRepository userRepository;

    public ProductController(ProductService productService, UserRepository userRepository) {
        this.productService = productService;
        this.userRepository = userRepository;
    }

    // 🔹 Get products for logged-in seller
    @GetMapping("/seller")
    public List<Product> getSellerProducts(Authentication authentication) {
        String email = authentication.getName();
        List<Product> products = productService.getProductsBySellerEmail(email);

        // prepend /uploads/ to imageUrl for frontend
        products.forEach(product -> {
            if (product.getImageUrl() != null && !product.getImageUrl().isEmpty()) {
                product.setImageUrl("/uploads/" + product.getImageUrl());
            }
        });

        return products;
    }

    // 🔹 Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // 🔹 Get product by ID
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.getProduct(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // 🔹 Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        Product product = productService.getProduct(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        User seller = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        if (!product.getSeller().getId().equals(seller.getId())) {
            return ResponseEntity.status(403).body("Forbidden: Not your product");
        }

        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    // 🔹 Update product
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id,
                                           @RequestBody Product updatedProduct,
                                           @AuthenticationPrincipal UserDetails userDetails) {

        Product product = productService.getProduct(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        User seller = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        if (product.getSeller() == null) {
            return ResponseEntity.status(400)
                    .body("Cannot update product: No seller assigned");
        }

        if (!product.getSeller().getId().equals(seller.getId())) {
            return ResponseEntity.status(403).body("Forbidden: Not your product");
        }

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setQuantity(updatedProduct.getQuantity());
        product.setImageUrl(updatedProduct.getImageUrl());

        Product savedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(savedProduct);
    }
}