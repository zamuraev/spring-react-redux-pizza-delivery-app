package com.zamuraev.backendpizzadeliveryapp.exceptions;

import com.zamuraev.backendpizzadeliveryapp.dto.ErrorDescription;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import java.time.LocalDateTime;

@ControllerAdvice
public class AppExceptionsHandler {

    @ExceptionHandler(value = {UserServiceException.class})
    public ResponseEntity<Object> handleUserServiceException(UserServiceException ex, WebRequest request) {

        ErrorDescription errorDescription = new ErrorDescription(LocalDateTime.now(), ex.getMessage());
        return new ResponseEntity<>(errorDescription, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {PizzaServiceException.class})
    public ResponseEntity<Object> handleUserServiceException(PizzaServiceException ex, WebRequest request) {

        ErrorDescription errorDescription = new ErrorDescription(LocalDateTime.now(), ex.getMessage());
        return new ResponseEntity<>(errorDescription, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<Object> handleOtherExceptions(Exception ex, WebRequest request) {

        ErrorDescription errorDescription = new ErrorDescription(LocalDateTime.now(), ex.getMessage());
        return new ResponseEntity<>(errorDescription, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
