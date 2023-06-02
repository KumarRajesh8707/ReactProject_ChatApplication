package com.mastercard.dxp.dto;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ItemCategoryDto {

	private Integer categoryId;

	private String categoryName;

	@JsonIgnore
	Set<String> item = new HashSet<>();

}
