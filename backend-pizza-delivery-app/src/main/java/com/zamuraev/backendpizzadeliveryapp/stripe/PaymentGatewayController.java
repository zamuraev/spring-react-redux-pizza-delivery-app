package com.zamuraev.backendpizzadeliveryapp.stripe;

import com.stripe.model.Charge;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/placeorder")
@Slf4j
public class PaymentGatewayController {

    private final StripeClient stripeClient;

    @Autowired
    PaymentGatewayController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    @PostMapping()
    public Charge chargeCard(
            @RequestHeader(value="token") String token,
            @RequestHeader(value="amount") Double amount) throws Exception {
        log.info("Customer Maid a payment...");
        return this.stripeClient.chargeNewCard(token, amount);
    }
}
