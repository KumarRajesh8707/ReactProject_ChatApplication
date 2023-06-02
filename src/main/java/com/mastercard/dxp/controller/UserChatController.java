package com.mastercard.dxp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mastercard.dxp.dto.ChatResponse;
import com.mastercard.dxp.dto.ServiceRequestDto;
import com.mastercard.dxp.dto.ServiceRequestSrDto;
import com.mastercard.dxp.dto.UserChatDTo1;
import com.mastercard.dxp.dto.UserChatDto;
import com.mastercard.dxp.dto.UserChatSrDto;
import com.mastercard.dxp.entity.ServiceRequest;
import com.mastercard.dxp.entity.UserChat;
import com.mastercard.dxp.repository.UserChatRepository;
import com.mastercard.dxp.service.UserChatService;

@RestController
@RequestMapping("/userChat")
@CrossOrigin(origins = "*")
public class UserChatController {
	@Autowired
	private UserChatService chatService;
	
	@PostMapping("/createChat")
	public ResponseEntity<ChatResponse> createUserchat(@RequestBody UserChatDto userChatDto) {
		return ResponseEntity.ok(chatService.createChat(userChatDto));
	}


	@PostMapping("fetchChat/SrNumber")
	public ResponseEntity<List<UserChatSrDto>> getbyId(@RequestBody ServiceRequestSrDto ucd) {
		 
		List<UserChatSrDto> userChat =  chatService.getAlluserchatByservicerequest_srNumber(ucd.getSrNumber());
		return new ResponseEntity<List<UserChatSrDto>>(userChat, HttpStatus.OK);
	}

	@PostMapping("fetchChat/userName")
	public ResponseEntity<List<UserChat>> getbyNmae(@RequestBody UserChatDTo1 ucd) {
		List<UserChat> userChat =  chatService.getAlluserchatByservicerequest_userCredential_userName(ucd.getUserName());
		return new ResponseEntity<List<UserChat>>(userChat, HttpStatus.OK);
	}

}
