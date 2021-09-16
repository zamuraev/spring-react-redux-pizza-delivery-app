package com.zamuraev.backendpizzadeliveryapp.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "pizzas")
public class Pizza {

    @Id
    private String id;

    @Size(min=2, max=30, message = "Field name should be more then 2 and less then 30 characters")
    @NotNull(message = "Pizza name can't be null")
    private String name;

    @Field(value = "category")
    private String category;

    @Field(value = "image")
    private String image;

    @Field(value = "description")
    private String description;

    @Field(value = "varients")
    private List<String> varients = List.of("small", "medium", "large");

    @Field(value = "prices")
    private List<Price> prices;

}
