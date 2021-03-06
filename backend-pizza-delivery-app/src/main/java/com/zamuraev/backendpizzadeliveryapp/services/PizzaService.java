package com.zamuraev.backendpizzadeliveryapp.services;

import com.zamuraev.backendpizzadeliveryapp.entities.Pizza;
import com.zamuraev.backendpizzadeliveryapp.exceptions.PizzaServiceException;
import com.zamuraev.backendpizzadeliveryapp.repositories.PizzaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PizzaService {

    private final PizzaRepository pizzaRepository;

    public Pizza createOrUpdate(Pizza pizza) {
         return pizzaRepository.save(pizza);
    }

    public boolean delete(String id) {
        Optional<Pizza> pizza = pizzaRepository.findById(id);
        if (pizza.isPresent()) {
            pizzaRepository.delete(pizza.get());
            return true;
        }
        throw new PizzaServiceException("Pizza with "+id+" does not exists!");
    }

    public List<Pizza> getAll(){
        return pizzaRepository.findAll();
    }

    public Pizza getById(String id){
        Optional<Pizza> pizza = pizzaRepository.findById(id);
        if(pizza.isPresent()){
            return pizza.get();
        }
        throw new PizzaServiceException("Pizza with "+id+" does not exists!");
    }


}
