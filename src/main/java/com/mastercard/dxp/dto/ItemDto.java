package com.mastercard.dxp.dto;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDto {
	
	private Integer itemId;

	private String descrption;
	private String url;
	Set<String> templates = new HashSet<>();
}
