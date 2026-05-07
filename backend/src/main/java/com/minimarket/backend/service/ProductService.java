package com.minimarket.backend.service;

import com.minimarket.backend.model.Product;
import com.minimarket.backend.model.Notification;
import com.minimarket.backend.repository.NotificationRepository;
import com.minimarket.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final NotificationRepository notificationRepository;

    public ProductService(ProductRepository productRepository, NotificationRepository notificationRepository) {
        this.productRepository = productRepository;
        this.notificationRepository = notificationRepository;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setQuantity(updatedProduct.getQuantity());
        product.setImageUrl(updatedProduct.getImageUrl());

        return productRepository.save(product);
    }

    // ✅ NEW METHOD: get products by seller email
    public List<Product> getProductsBySellerEmail(String email) {
        return productRepository.findBySeller_Email(email);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCaseOrCategory_NameContainingIgnoreCase(keyword, keyword);
    }

    public void notifyMe(Long productId, Long userId) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setMessage("User " + userId + " wants to be notified when product " + productId + " is restocked.");
        notification.setType("RESTOCK_REQUEST");
        notificationRepository.save(notification);
    }
}