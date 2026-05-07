package com.minimarket.backend.config;

import com.minimarket.backend.model.*;
import com.minimarket.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OfferRepository offerRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, ProductRepository productRepository, 
                      CategoryRepository categoryRepository, OfferRepository offerRepository, 
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.offerRepository = offerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Seed Users
            User seller = new User();
            seller.setName("Admin Seller");
            seller.setEmail("seller@example.com");
            seller.setPassword(passwordEncoder.encode("password"));
            seller.setRole(Role.SELLER);
            userRepository.save(seller);

            User buyer = new User();
            buyer.setName("Test Buyer");
            buyer.setEmail("buyer@example.com");
            buyer.setPassword(passwordEncoder.encode("password"));
            buyer.setRole(Role.BUYER);
            buyer.setPhone("1234567890");
            userRepository.save(buyer);

            // Seed Categories
            Category electronics = new Category("Electronics");
            Category groceries = new Category("Groceries");
            Category fashion = new Category("Fashion");
            categoryRepository.save(electronics);
            categoryRepository.save(groceries);
            categoryRepository.save(fashion);

            // Seed Products
            Product p1 = new Product("Smartphone", "Latest model with 128GB storage", 699.99, 10, electronics);
            p1.setSeller(seller);
            productRepository.save(p1);

            Product p2 = new Product("Organic Apples", "Fresh organic apples per kg", 2.99, 50, groceries);
            p2.setSeller(seller);
            productRepository.save(p2);

            Product p3 = new Product("Cotton T-Shirt", "100% Cotton Blue T-Shirt", 15.99, 0, fashion); // 0 stock
            p3.setSeller(seller);
            productRepository.save(p3);

            // Seed Offers
            Offer offer1 = new Offer();
            offer1.setTitle("Summer Electronics Sale");
            offer1.setDescription("Up to 20% off on select smartphones");
            offer1.setDiscountPercentage(20.0);
            offer1.setExpiryDate(LocalDateTime.now().plusDays(15));
            offerRepository.save(offer1);
            
            Offer offer2 = new Offer();
            offer2.setTitle("Fresh Groceries Promo");
            offer2.setDescription("Flat 5% off on all organic products");
            offer2.setDiscountPercentage(5.0);
            offer2.setExpiryDate(LocalDateTime.now().plusDays(5));
            offerRepository.save(offer2);
        }
    }
}
