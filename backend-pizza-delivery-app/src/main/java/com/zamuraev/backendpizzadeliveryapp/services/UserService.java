package com.zamuraev.backendpizzadeliveryapp.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import com.zamuraev.backendpizzadeliveryapp.dto.*;
import java.util.List;

public interface UserService extends UserDetailsService {

    UserDto createUser(UserDto user);
    UserDto getUserByUserId(String userId);
    UserDto getUserDetailsByEmail(String email);
    UserDto updateUser(String userId, UserDto userDto);
    void deleteUser(String userId);
    List<UserDto> getUsers(int page, int limit);
    UserDto getUserByEmail(String email);
}
