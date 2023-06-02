package com.mastercard.dxp.dto;

import com.mastercard.dxp.entity.User_credential;

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
public class ServiceRequestDto {
	
	private String userName;
	private String issueType;
	private String comments;
	
//	String status;

	String AssignTo;
}
