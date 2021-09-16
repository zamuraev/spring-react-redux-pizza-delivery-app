package com.zamuraev.backendpizzadeliveryapp.controllers;

import com.zamuraev.backendpizzadeliveryapp.entities.Pizza;
import com.zamuraev.backendpizzadeliveryapp.services.PizzaService;
import com.zamuraev.backendpizzadeliveryapp.services.ValidationErrorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/pizzas")
@RequiredArgsConstructor
public class PizzaController {

    private final PizzaService pizzaService;
    private final ValidationErrorService validationService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(pizzaService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id){
        return new ResponseEntity<>(pizzaService.getById(id),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Pizza wallet, BindingResult result) {
        ResponseEntity errors = validationService.validate(result);
        if(errors!=null) return errors;

        Pizza pizzaSaved = pizzaService.createOrUpdate(wallet);
        return new ResponseEntity<Pizza>(pizzaSaved, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @Valid @RequestBody Pizza wallet, BindingResult result){
        ResponseEntity errors = validationService.validate(result);
        if(errors != null) return errors;

        wallet.setId(id);
        Pizza pizzaSaved = pizzaService.createOrUpdate(wallet);
        return new ResponseEntity<Pizza>(pizzaSaved,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        pizzaService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }


}
