package com.zamuraev.backendpizzadeliveryapp.services;

import com.zamuraev.backendpizzadeliveryapp.dto.ErrorMessages;
import com.zamuraev.backendpizzadeliveryapp.dto.UserDto;
import com.zamuraev.backendpizzadeliveryapp.entities.UserEntity;
import com.zamuraev.backendpizzadeliveryapp.exceptions.UserServiceException;
import com.zamuraev.backendpizzadeliveryapp.repositories.UserRepository;
import com.zamuraev.backendpizzadeliveryapp.util.Utils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final Utils utils;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, Utils utils,
                           BCryptPasswordEncoder bCryptPasswordEncoder, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.utils = utils;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.modelMapper = modelMapper;
    }

    @Override
    public UserDto getUserByEmail(String email) {

        UserEntity userEntity = userRepository.findByEmail(email);
        if (userEntity == null) throw new UsernameNotFoundException(email);

        UserDto returnValue = modelMapper.map(userEntity, UserDto.class);
        return returnValue;
    }

    @Override
    public UserDto createUser(UserDto user) {

        if (userRepository.findByEmail(user.getEmail()) != null)
            throw new UserServiceException(ErrorMessages.RECORD_ALREADY_EXISTS.getErrorMessage());

        UserEntity userEntity = modelMapper.map(user, UserEntity.class);

        userEntity.setUserId(utils.generateUserId(30));
        userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        UserEntity storedUserDetails = userRepository.save(userEntity);
        UserDto returnValue = modelMapper.map(storedUserDetails, UserDto.class);

        return returnValue;
    }

    //Spring Security
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email);
        if (userEntity == null) throw new UserServiceException("User with email: " + email + " not found");
        return new User(
                userEntity.getEmail(),
                userEntity.getEncryptedPassword(),
                true,
                true,
                true,
                true,
                new ArrayList<>()
        );
    }

    @Override
    public UserDto getUserByUserId(String userId) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) throw new UserServiceException("User with Id: " + userId + " not found");

        UserDto userDto = modelMapper.map(userEntity, UserDto.class);

        return userDto;
    }

    @Override
    public UserDto getUserDetailsByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);
        if (userEntity == null) throw new UserServiceException("User with email: " + email + " not found");

        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userEntity, userDto);

        return userDto;
    }

    @Override
    public UserDto updateUser(String userId, UserDto userDto) {

        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) throw new UserServiceException("User with Id: " + userId + " not found");

        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        UserEntity updatedUserDetails = userRepository.save(userEntity);

        UserDto returnValue = modelMapper.map(updatedUserDetails, UserDto.class);

        return returnValue;
    }

    @Override
    public void deleteUser(String userId) {
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) throw new UserServiceException("User with Id: " + userId + " not found");

        userRepository.delete(userEntity);
    }

    @Override
    public List<UserDto> getUsers(int page, int limit) {

        List<UserDto> returnValue = new ArrayList<>();

        //Add pagination support for Users
        if (page > 0) page -= 1;

        Pageable pageableRequest = PageRequest.of(page, limit);
        Page<UserEntity> usersPage = userRepository.findAll(pageableRequest);

        usersPage.getContent().stream().forEach(userEntity -> {

            returnValue.add(modelMapper.map(userEntity, UserDto.class));
        });

        return returnValue;
    }


}
