package com.mastercard.dxp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.mastercard.dxp.dto.UserDto;
import com.mastercard.dxp.entity.User_credential;
import com.mastercard.dxp.repository.User_Repository;
/**
* 
* 
*@author siddhartha.agrawal
*/
@Service
public class User_Service {
	@Autowired
	public User_Repository user_Repo;
	
	@Autowired
	public BCryptPasswordEncoder passwordEncoder;

	public String validateUser(String userName, String password) {

		User_credential user = user_Repo.findByUserName(userName);
		if (user == null) {
			return "User not found";
		}
		if (!passwordEncoder.matches(password, user.getConfirm_password())) {
			return "password incorrect";
		}

		return "User signedUp successfully";

	}

	public String signUp(UserDto userDto) {

		User_credential existingUser = user_Repo.findByUserName(userDto.getUserName());

		if (existingUser != null) {
			return "Username is already exsits";
		}
		if (!userDto.getConfirm_password().equals(userDto.getPassword())) {
			return "password and confirm password must be same";
		} else {
			
			User_credential user =new User_credential();
			user.setEmail(userDto.getEmail());
			user.setUserName(userDto.getUserName());
			user.setPassword(passwordEncoder.encode(userDto.getPassword()));
			user.setConfirm_password(passwordEncoder.encode(userDto.getConfirm_password()));
			user_Repo.save(user);
			return "User signup successfully";
		}
	}

}
