package com.zamuraev.backendpizzadeliveryapp.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
public class ErrorDescription {

    private LocalDateTime timestamp;
    private String message;

    public ErrorDescription(LocalDateTime timestamp, String message) {
        this.timestamp = timestamp;
        this.message = message;

    }
}
