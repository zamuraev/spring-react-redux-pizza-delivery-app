package com.zamuraev.backendpizzadeliveryapp.repositories;

import com.zamuraev.backendpizzadeliveryapp.entities.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByUserId(String userId);
}

