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
public class ChatResponse {
	 
	private int chatIds;
	private String response;
	 
	
	
}
