package com.mastercard.dxp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mastercard.dxp.controller.DuplicateValueException;
import com.mastercard.dxp.dto.ItemDto;
import com.mastercard.dxp.dto.ItemDto2;

@Service
public interface ItemService {

	public ItemDto updateItem(Integer id, ItemDto course);

	public String deleteItem(Integer id);
	
	public ItemDto2 addItem(ItemDto2 itemDto)throws DuplicateValueException;
	public List<ItemDto> getAllItem();

	public List<ItemDto> getItemById(Integer id);

	public List<ItemDto2> getItemByName(String name);

}
