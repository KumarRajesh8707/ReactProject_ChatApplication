package com.mastercard.dxp.dto;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

 
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserChatSrDto {
	private int chatId;
	private String chatType;
	private String messages;
	private String comments;
	
	

}
