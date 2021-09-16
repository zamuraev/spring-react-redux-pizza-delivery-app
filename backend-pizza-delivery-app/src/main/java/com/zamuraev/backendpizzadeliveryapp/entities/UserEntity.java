package com.zamuraev.backendpizzadeliveryapp.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@Document(collection = "users")
public class UserEntity {

    @Id
    private String id;

    private String userId;

    @NotNull(message = "User's first name can't be null")
    private String firstName;

    @NotNull(message = "User's last name can't be null")
    private String lastName;

    private String email;

    private String encryptedPassword;

    private String emailVerificationToken;

    private Boolean emailVerificationStatus = false;

}


