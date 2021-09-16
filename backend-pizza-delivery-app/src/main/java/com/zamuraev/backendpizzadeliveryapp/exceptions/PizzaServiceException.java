package com.zamuraev.backendpizzadeliveryapp.exceptions;

public class PizzaServiceException extends  RuntimeException{

    public PizzaServiceException(String message) {
        super(message);
    }
}
