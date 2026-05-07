package com.minimarket.backend.controller;

import com.minimarket.backend.model.Offer;
import com.minimarket.backend.model.SupportTicket;
import com.minimarket.backend.model.User;
import com.minimarket.backend.repository.OfferRepository;
import com.minimarket.backend.repository.SupportTicketRepository;
import com.minimarket.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @GetMapping("/rewards")
    public ResponseEntity<?> getRewards(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(Map.of("rewardPoints", user.getRewardPoints()));
    }

    @GetMapping("/offers")
    public List<Offer> getOffers() {
        return offerRepository.findAll();
    }

    @GetMapping("/support")
    public List<SupportTicket> getSupportTickets(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        return supportTicketRepository.findByUserId(user.getId());
    }

    @PostMapping("/support")
    public SupportTicket createSupportTicket(@AuthenticationPrincipal UserDetails userDetails, @RequestBody SupportTicket ticket) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        ticket.setUserId(user.getId());
        return supportTicketRepository.save(ticket);
    }
}
