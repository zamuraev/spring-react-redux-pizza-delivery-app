package com.zamuraev.backendpizzadeliveryapp.controllers;

import com.zamuraev.backendpizzadeliveryapp.dto.UserDetailsRequestModel;
import com.zamuraev.backendpizzadeliveryapp.dto.UserDto;
import com.zamuraev.backendpizzadeliveryapp.dto.UserRest;
import com.zamuraev.backendpizzadeliveryapp.services.UserService;
import com.zamuraev.backendpizzadeliveryapp.services.ValidationErrorService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.modelmapper.ModelMapper;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final ValidationErrorService validationService;

    @PostMapping(produces = {MediaType.APPLICATION_JSON_VALUE}, consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> createUser(@Valid @RequestBody UserDetailsRequestModel userDetails, BindingResult result) {

        ResponseEntity errors = validationService.validate(result);
        if(errors!=null) return errors;

        UserDto userDto = modelMapper.map(userDetails, UserDto.class);
        UserDto createdUser = userService.createUser(userDto);
        UserRest returnValue = modelMapper.map(createdUser, UserRest.class);
        return new ResponseEntity<UserRest>(returnValue, HttpStatus.CREATED);
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "authorization", value = "${userController.authorizationHeader.description}", paramType = "header")})
    @ApiOperation(value="Get User Details Web Service Endpoint", notes="${userController.getUser.apiOperation.notes}")
    @GetMapping(value = "/{userId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public UserRest getUser(@PathVariable(name = "userId") String userId) {

        UserDto userDto = userService.getUserByUserId(userId);
        UserRest returnValue = modelMapper.map(userDto, UserRest.class);
        return returnValue;
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "authorization", value = "${userController.authorizationHeader.description}", paramType = "header")})
    @PutMapping(value = "/{userId}", produces = {MediaType.APPLICATION_JSON_VALUE},
            consumes = {MediaType.APPLICATION_JSON_VALUE})
    public UserRest updateUser(@PathVariable(name = "userId") String userId, @RequestBody UserDetailsRequestModel userDetails) {

        UserDto userDto = modelMapper.map(userDetails, UserDto.class);
        UserDto updatedUser = userService.updateUser(userId, userDto);
        UserRest returnValue = modelMapper.map(updatedUser, UserRest.class);
        return returnValue;
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "authorization", value = "${userController.authorizationHeader.description}", paramType = "header")})
    @DeleteMapping(value = "/{userId}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Void> deleteUser(@PathVariable(name = "userId") String userId) {

        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "authorization", value = "${userController.authorizationHeader.description}", paramType = "header")})
    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<UserRest> getUsers(@RequestParam(value = "page", defaultValue = "1") int page,
                                   @RequestParam(value = "limit", defaultValue = "25") int limit) {
        List<UserRest> returnValue = new ArrayList<>();
        userService.getUsers(page, limit).stream().forEach(userDto -> {
            returnValue.add(modelMapper.map(userDto, UserRest.class));
        });

        return returnValue;
    }


}
