package com.zamuraev.backendpizzadeliveryapp.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Price {

    private String small;
    private String medium;
    private String large;

}
