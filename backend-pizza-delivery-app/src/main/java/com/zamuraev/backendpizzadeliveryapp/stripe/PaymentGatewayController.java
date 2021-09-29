package com.zamuraev.backendpizzadeliveryapp.stripe;

import com.stripe.model.Charge;
import com.zamuraev.backendpizzadeliveryapp.entities.Order;
import com.zamuraev.backendpizzadeliveryapp.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin("*")
@RequestMapping("/placeorder")
@Slf4j
@RequiredArgsConstructor
public class PaymentGatewayController {

    private final StripeClient stripeClient;
    private final OrderRepository orderRepository;

    @PostMapping()
    public Charge chargeCard(
            @RequestHeader(value="token") String token,
            @RequestHeader(value="amount") Double amount,
            @RequestBody Order order
            ) throws Exception {

        orderRepository.save(order);
        log.info("Customer with id: " + order.getUserId()+ " initiate a payment");
        return this.stripeClient.chargeNewCard(token, amount);
    }
}
