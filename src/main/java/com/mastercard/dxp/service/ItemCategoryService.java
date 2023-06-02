package com.mastercard.dxp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mastercard.dxp.dto.ItemCategoryDto;
import com.mastercard.dxp.dto.ItemCategoryDto2;
import com.mastercard.dxp.entity.ItemCategory;

@Service
public interface ItemCategoryService {

	ItemCategoryDto creatCategory(ItemCategoryDto itemCategoryDto);

	List<ItemCategory> getCategoryName();

	List<ItemCategoryDto2> getCategoryeByName(String categoryName);

	

}
