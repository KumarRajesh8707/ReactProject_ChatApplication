package com.mastercard.dxp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mastercard.dxp.dto.ChatResponse;
import com.mastercard.dxp.dto.ItemDto;
import com.mastercard.dxp.dto.UserChatDto;
import com.mastercard.dxp.dto.UserChatSrDto;
import com.mastercard.dxp.entity.ServiceRequest;
import com.mastercard.dxp.entity.UserChat;
import com.mastercard.dxp.repository.ServiceRequestRepository;
import com.mastercard.dxp.repository.UserChatRepository;
/**
* 
* @author siddhartha.agrawal
*
*/
@Service
public class UserChatService {
	@Autowired
	private UserChatRepository userRepo;
	@Autowired
	private ServiceRequestRepository serviceRequestRepository;

	public ChatResponse createChat(UserChatDto userChatDto) {

		UserChat userChat = new UserChat();

		ServiceRequest sr = serviceRequestRepository.findById(userChatDto.getSrNumber())
				.orElseThrow(() -> new RuntimeException("SR not found"));

		userChat.setServicerequest(sr);
		if(userChatDto.getChatType().equals("Admin")) {
			sr.setStatus("inprogress");
			
		}
//		 
		 
		userChat.setChatType(userChatDto.getChatType());
		userChat.setChatMessages(userChatDto.getChatMessages());
		userRepo.save(userChat);

		ChatResponse chatResponse = new ChatResponse();
		chatResponse.setChatIds(userChat.getId());
		chatResponse.setResponse("Chat Response saved successfully by " + userChatDto.getSrNumber());
		return chatResponse;
	}

	public List<UserChatSrDto> getAlluserchatByservicerequest_srNumber(int srNumber) {
		List<UserChat> userchat = userRepo.findAlluserchatByservicerequest_srNumber(srNumber);
		List<UserChatSrDto> userChatSrDto=new ArrayList<>();
		userchat.stream().forEach(chat -> {
			UserChatSrDto obj = mapEntityToDto(chat);
			userChatSrDto.add(obj);
		});
		
		
 
		return userChatSrDto;

	}

	private UserChatSrDto mapEntityToDto(UserChat chat) {
		UserChatSrDto response=new UserChatSrDto();
		response.setChatId(chat.getId());
		response.setChatType(chat.getChatType());
		response.setMessages(chat.getChatMessages());
		response.setComments(chat.getServicerequest().getComments());
		
		 
		return response;
	}
	

	public List<UserChat> getAlluserchatByservicerequest_userCredential_userName(String userName) {
		List<UserChat> userchat = userRepo.findAlluserchatByservicerequest_userCredential_userName(userName);

		return userchat;
	}

}
