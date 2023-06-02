package com.mastercard.dxp.service;



import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mastercard.dxp.dto.ItemCategoryDto;
import com.mastercard.dxp.dto.ItemCategoryDto2;
import com.mastercard.dxp.entity.Item;
import com.mastercard.dxp.entity.ItemCategory;
import com.mastercard.dxp.repository.ItemCategoryRepository;
import com.mastercard.dxp.repository.ItemRepository;

@Service
public class ItemCategoryServiceImpl implements ItemCategoryService {

	@Autowired
	private ItemCategoryRepository itemCategoryRepository;
	
	@Autowired
	private ItemRepository itemRepository;
	
	
	private void mapDtoToEntity(ItemCategoryDto itemCategoryDto, ItemCategory itemCategory) {
		itemCategory.setCategoryId(itemCategoryDto.getCategoryId());
		itemCategory.setCategoryName(itemCategoryDto.getCategoryName());
		if(null==itemCategory.getNewitem()) {
			itemCategory.setNewitem(new HashSet<>());
		}
		
		itemCategoryDto.getItem().stream().forEach(description -> {
			Item item=itemRepository.findByDescription(description);
			if(item == null) {
				item = new Item();
				item.setItemCategory(new HashSet<>());
			}
			
			item.setDescription(description);
			item.addCategory(itemCategory);
		});
	}
	
	private ItemCategoryDto mapEntityToDto(ItemCategory itemCategory) {
		ItemCategoryDto itemCategoryDto = new ItemCategoryDto();
		itemCategoryDto.setCategoryId(itemCategory.getCategoryId());
		
		itemCategoryDto.setCategoryName(itemCategory.getCategoryName());
		itemCategoryDto.setItem(itemCategory.getNewitem().stream().map(Item::getDescription).collect(Collectors.toSet()));
		return itemCategoryDto;
		
	}
	

	@Override
	public ItemCategoryDto creatCategory(ItemCategoryDto itemCategoryDto) {
		ItemCategory itemCategory = new ItemCategory();
		mapDtoToEntity(itemCategoryDto, itemCategory);
		ItemCategory saveCategory = itemCategoryRepository.save(itemCategory);
		return mapEntityToDto(saveCategory);
	}

	@Override
	public List<ItemCategory> getCategoryName() {
		List itemCategory = itemCategoryRepository.getCategoryName();
		return itemCategory;
	}

	

	private void mapDto2ToEntity(ItemCategoryDto2 itemCategoryDto2, ItemCategory itemCategory) {
		itemCategory.setCategoryId(itemCategoryDto2.getCategoryId());
		itemCategory.setCategoryName(itemCategoryDto2.getCategoryName());
		if(null==itemCategory.getNewitem()) {
			itemCategory.setNewitem(new HashSet<>());
		}
		
		itemCategoryDto2.getItem().stream().forEach(description -> {
			Item item=itemRepository.findByDescription(description);
			if(item == null) {
				item = new Item();
				item.setItemCategory(new HashSet<>());
			}
			
			item.setDescription(description);
			item.addCategory(itemCategory);
		});
	}
	
	private ItemCategoryDto2 mapEntityToDto2(ItemCategory itemCategory) {
		ItemCategoryDto2 itemCategoryDto = new ItemCategoryDto2();
		itemCategoryDto.setCategoryId(itemCategory.getCategoryId());
		
		itemCategoryDto.setCategoryName(itemCategory.getCategoryName());
		itemCategoryDto.setItem(itemCategory.getNewitem().stream().map(Item::getDescription).collect(Collectors.toSet()));
		return itemCategoryDto;
		
	}

	@Override
	public List<ItemCategoryDto2> getCategoryeByName(String categoryName) {
		List<ItemCategoryDto2> categoryDtos=new ArrayList<>();
		Optional<ItemCategory> itemCategory=itemCategoryRepository.getByName(categoryName);
		itemCategory.stream().forEach(itemCategorys -> {
			ItemCategoryDto2 categoryDto = mapEntityToDto2(itemCategorys);
			categoryDtos.add(categoryDto);
		});
		return categoryDtos;
	}

}
