package com.zamuraev.backendpizzadeliveryapp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginRequestModel {

    private String email;
    private String password;
}
