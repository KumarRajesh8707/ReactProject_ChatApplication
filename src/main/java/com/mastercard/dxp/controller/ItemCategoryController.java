package com.mastercard.dxp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mastercard.dxp.dto.ItemCategoryDto;
import com.mastercard.dxp.dto.ItemCategoryDto2;
import com.mastercard.dxp.entity.ItemCategory;
import com.mastercard.dxp.service.ItemCategoryService;

@RestController
@RequestMapping("/itemCategory")
@CrossOrigin(origins = "*")
public class ItemCategoryController {
	@Autowired
	private ItemCategoryService itemCategoryService;

	@PostMapping("/data")
	public ResponseEntity<ItemCategoryDto> creatCategory(@RequestBody ItemCategoryDto itemCategoryDto) {
		ItemCategoryDto item_obj = itemCategoryService.creatCategory(itemCategoryDto);
		return new ResponseEntity<>(item_obj, HttpStatus.CREATED);
	}

	@GetMapping("/categoryName")
	public ResponseEntity<List<ItemCategory>> getCategoryName() {
		List<ItemCategory> template = itemCategoryService.getCategoryName();
		return new ResponseEntity<>(template, HttpStatus.OK);
	}

	@GetMapping("/category/{categoryName}")
	public ResponseEntity<List<ItemCategoryDto2>> getByName(@PathVariable String categoryName) {
		List<ItemCategoryDto2> category = itemCategoryService.getCategoryeByName(categoryName);
		return new ResponseEntity<>(category, HttpStatus.OK);
	}

}
