package com.zamuraev.backendpizzadeliveryapp.repositories;

import com.zamuraev.backendpizzadeliveryapp.entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {

    UserEntity findByEmail(String email);
    UserEntity findByUserId(String userId);


}
