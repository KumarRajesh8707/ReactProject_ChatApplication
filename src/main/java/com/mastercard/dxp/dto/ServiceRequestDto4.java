package com.mastercard.dxp.dto;

import java.time.LocalDateTime;

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
public class ServiceRequestDto4 {
	int srNumber;
	private String userName;
	private String issueType;
	private String comments;
	private String status;

	private String AssignTo;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
