package com.zamuraev.backendpizzadeliveryapp.services;

import com.zamuraev.backendpizzadeliveryapp.entities.Order;
import com.zamuraev.backendpizzadeliveryapp.exceptions.OrderServiceException;
import com.zamuraev.backendpizzadeliveryapp.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public List<Order> getAll(){
        return orderRepository.findAll();
    }

    public List<Order> getAllByUserId(String userId){
        return orderRepository.findByUserId(userId);
    }

    public Order getById(String orderId){
        Optional<Order> order = orderRepository.findById(orderId);
        if(order.isPresent()){
            return order.get();
        }
        throw new OrderServiceException("Order with "+orderId+" does not exists!");
    }

    public Order createOrUpdate(Order order) {

        return orderRepository.save(order);
    }

    public boolean delete(String orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            orderRepository.delete(order.get());
            return true;
        }
        throw new OrderServiceException("Order with "+orderId+" does not exists!");
    }

    public Order setOrderDeliveredStatusIsTrue(String orderId){
        Optional<Order> order = orderRepository.findById(orderId);
        if(order.isPresent()){
            Order updatedOrder = order.get();
            updatedOrder.setIsDelivered(true);
            return orderRepository.save(updatedOrder);
        }
        throw new OrderServiceException("Order with "+orderId+" does not exists!");
    }

}
