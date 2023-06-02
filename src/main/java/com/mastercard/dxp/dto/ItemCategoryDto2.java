package com.mastercard.dxp.dto;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ItemCategoryDto2 {
	
	private Integer categoryId;
	private String categoryName;
	
	Set<String> item = new HashSet<>();
	
	
	

}
