package com.mastercard.dxp.dto;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ModuleDto {
	private Integer id;
	private String name;
	private String description;
	
	private Set<String> templates = new HashSet<>();
}