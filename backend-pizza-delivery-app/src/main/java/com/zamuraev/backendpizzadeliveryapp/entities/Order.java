package com.zamuraev.backendpizzadeliveryapp.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String userId;
    private List<Object> orderItems;
    private Object shippingAddress;
    private Integer orderAmount;
    private Boolean isDelivered = false;
    private String transactionId;
    private LocalDateTime date = LocalDateTime.now();

}
