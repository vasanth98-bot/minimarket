package com.minimarket.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.minimarket.backend.entity.Cart;
import com.minimarket.backend.model.Product;
import com.minimarket.backend.model.User;
import com.minimarket.backend.model.Order;   
import com.minimarket.backend.repository.CartRepository;
import com.minimarket.backend.repository.OrderRepository;
import com.minimarket.backend.repository.ProductRepository;
import com.minimarket.backend.repository.UserRepository;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/buyer")
@PreAuthorize("hasRole('BUYER')")
public class BuyerController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;


    @GetMapping("/home")
    public String home() {
        return "Buyer Home";
    }

     @GetMapping("/profile")
    public String getProfile() {
        return "Buyer Profile Data";
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/cart/add/{productId}")
    public ResponseEntity<?> addToCart(@PathVariable Long productId,
                                       Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        Product product = productRepository.findById(productId).orElseThrow();

        Optional<Cart> existingCart =
                cartRepository.findByUserAndProduct(user, product);

        if (existingCart.isPresent()) {

            Cart cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + 1);
            cartRepository.save(cart);

        } else {

            Cart cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(1);
            cartRepository.save(cart);
        }

        return ResponseEntity.ok("Product added to cart");
    }

    @GetMapping("/cart")
    public List<Cart> viewCart(Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        return cartRepository.findByUser(user);
    }

    @DeleteMapping("/cart/remove/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long productId,
                                            Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();

        cartRepository.findByUserAndProduct(user, product)
                .ifPresent(cartRepository::delete);

        return ResponseEntity.ok("Product removed from cart");
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(Authentication authentication) {

    String email = authentication.getName();
    User user = userRepository.findByEmail(email).orElseThrow();

    List<Cart> cartItems = cartRepository.findByUser(user);

    if (cartItems.isEmpty()) {
        return ResponseEntity.ok("Cart is empty");
    }

    for (Cart cart : cartItems) {

        double price = cart.getProduct().getPrice();
        int quantity = cart.getQuantity();
        double total = price * quantity;

        Order order = new Order();

        order.setProductId(cart.getProduct().getId());
        order.setBuyerEmail(user.getEmail());
        order.setQuantity(quantity);
        order.setTotalPrice(total);
        order.setOrderTime(java.time.LocalDateTime.now());
        order.setStatus(com.minimarket.backend.model.OrderStatus.PLACED);

        orderRepository.save(order);
    }

    cartRepository.deleteAll(cartItems);

    return ResponseEntity.ok("Order placed successfully");
}


    }





