package com.zamuraev.backendpizzadeliveryapp.repositories;

import com.zamuraev.backendpizzadeliveryapp.entities.Pizza;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PizzaRepository extends MongoRepository<Pizza, String> {

}
