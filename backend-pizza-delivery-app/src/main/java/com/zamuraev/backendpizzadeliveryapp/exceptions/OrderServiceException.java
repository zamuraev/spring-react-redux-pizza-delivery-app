package com.zamuraev.backendpizzadeliveryapp.exceptions;

public class OrderServiceException extends  RuntimeException{

    public OrderServiceException(String message) {
        super(message);
    }
}

