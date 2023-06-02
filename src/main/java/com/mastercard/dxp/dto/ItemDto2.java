package com.mastercard.dxp.dto;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mastercard.dxp.entity.ItemCategory;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDto2 {
	private Integer itemId;

	private String descrption;

	private String url;

	@JsonIgnore
	Set<String> templates = new HashSet<>();

	private Set<String> itemCategory = new HashSet<>();

}
