package com.zamuraev.backendpizzadeliveryapp.controllers;

import com.zamuraev.backendpizzadeliveryapp.entities.Order;
import com.zamuraev.backendpizzadeliveryapp.repositories.OrderRepository;
import com.zamuraev.backendpizzadeliveryapp.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin("*")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderService orderService;

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getAll(@PathVariable(name = "userId") String userId) {

        return new ResponseEntity<List<Order>>(orderService.getAllByUserId(userId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<List<Order>>(orderRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getById(@PathVariable(name = "orderId") String orderId){
        return new ResponseEntity<Order>(orderService.getById(orderId),HttpStatus.OK);
    }

    @GetMapping("/{orderId}/deliver")
    public ResponseEntity<?> setDeliveredStatusIsTrue(@PathVariable String orderId){
        return new ResponseEntity<Order>(orderService.setOrderDeliveredStatusIsTrue(orderId),HttpStatus.OK);
    }


}
