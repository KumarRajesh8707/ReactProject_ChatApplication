package com.mastercard.dxp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mastercard.dxp.dto.UserDto;
import com.mastercard.dxp.entity.User_credential;
import com.mastercard.dxp.service.User_Service;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/User")
public class User_Controller {
	@Autowired
	public User_Service user_Serev;

	@PostMapping("/register")
	public String signUp(@RequestBody UserDto userDto) {
		return user_Serev.signUp(userDto);

	}
	

	@PostMapping("/login")
	public ResponseEntity<String> validateUser(@RequestParam String userName, @RequestParam String password) {
		String user = user_Serev.validateUser(userName, password);
		return ResponseEntity.ok(user);

	}

}
