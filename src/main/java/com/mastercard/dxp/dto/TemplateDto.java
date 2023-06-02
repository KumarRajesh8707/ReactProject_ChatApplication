package com.mastercard.dxp.dto;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemplateDto {
	private Integer id;
	private String name;
	private String description;

	@JsonIgnore
	Set<String> modules = new HashSet<>();

	private Set<String> items = new HashSet<>();
	
	
	
}