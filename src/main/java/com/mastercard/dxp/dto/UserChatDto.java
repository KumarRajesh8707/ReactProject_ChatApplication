package com.mastercard.dxp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserChatDto {
	private int srNumber;
	private String chatType;
	private String chatMessages;

}
