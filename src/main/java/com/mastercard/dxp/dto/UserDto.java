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
public class UserDto {

	 
	
	private String userName;
	
	private String email;
	
	private String password;
	private String Confirm_password;
	
}
