package com.mastercard.dxp.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mastercard.dxp.controller.DuplicateValueException;
import com.mastercard.dxp.dto.ItemDto;
import com.mastercard.dxp.dto.ItemDto2;
import com.mastercard.dxp.entity.Item;
import com.mastercard.dxp.entity.ItemCategory;
import com.mastercard.dxp.entity.Template;
import com.mastercard.dxp.repository.ItemCategoryRepository;
import com.mastercard.dxp.repository.ItemRepository;
import com.mastercard.dxp.repository.TemplateRepository;

@Service
public class ItemServiceImpl implements ItemService {

	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private TemplateRepository templateRepository;

	@Autowired
	private ItemCategoryRepository itemCategoryRepository;

	@Override
	public ItemDto updateItem(Integer id, ItemDto itemDto) {
		Item crs = itemRepository.getOne(id);
		crs.getTemplate().clear();
		mapDtoToEntity(itemDto, crs);
		Item item = itemRepository.save(crs);
		return mapEntityToDto(item);
	}

	@Override
	public String deleteItem(Integer id) {
		Optional<Item> item = itemRepository.findById(id);

		if (item.isPresent()) {
			item.get().removeTemplates();
			itemRepository.deleteById(item.get().getItemId());
			return "Item with id: " + id + " deleted successfully!";
		}
		return null;
	}

	@Override
	public ItemDto2 addItem(ItemDto2 itemDto) throws DuplicateValueException {

		if (itemRepository.findByDescription(itemDto.getDescrption()) != null) {
			throw new DuplicateValueException("The value already exsits");
		} else {
			Item item = new Item();
			mapDto2ToEntity(itemDto, item);
			Item savedCourse = itemRepository.save(item);
			return mapEntityToDto2(savedCourse);
		}
	}

	@Override
	public List<ItemDto> getAllItem() {
		List<ItemDto> itemDtos = new ArrayList<>();
		List<Item> items = itemRepository.findAll();
		items.stream().forEach(course -> {
			ItemDto itemDto = mapEntityToDto(course);
			itemDtos.add(itemDto);
		});
		return itemDtos;
	}

	private void mapDtoToEntity(ItemDto itemDto, Item item) {
		item.setDescription(itemDto.getDescrption());
		item.setUrl(itemDto.getUrl());

		if (null == item.getTemplate()) {
			item.setTemplate(new HashSet<>());
		}

		itemDto.getTemplates().stream().forEach(studentName -> {
			Template template = templateRepository.findByName(studentName);
			if (null == template) {
				template = new Template();
				template.setItems(new HashSet<>());
			}
			template.setName(studentName);

			template.addItem(item);
		});
	}

	private ItemDto mapEntityToDto(Item item) {
		ItemDto responseDto = new ItemDto();

		responseDto.setItemId(item.getItemId());
		responseDto.setDescrption(item.getDescription());
		responseDto.setUrl(item.getUrl());
		responseDto.setTemplates(item.getTemplate().stream().map(Template::getName).collect(Collectors.toSet()));
		return responseDto;
	}

	@Override
	public List<ItemDto> getItemById(Integer id) {
		List<ItemDto> itemDtos = new ArrayList<>();
		Optional<Item> item = itemRepository.findById(id);
		item.stream().forEach(items -> {
			ItemDto itemDto = mapEntityToDto(items);
			itemDtos.add(itemDto);
		});
		return itemDtos;
	}

	@Override
	public List<ItemDto2> getItemByName(String name) {
		List<ItemDto2> itemDtos = new ArrayList<>();
		Optional<Item> item = itemRepository.getByDescription(name);
		item.stream().forEach(items -> {
			ItemDto2 itemDto = mapEntityToDto2(items);
			itemDtos.add(itemDto);
		});
		return itemDtos;
	}

	private void mapDto2ToEntity(ItemDto2 itemDto2, Item item) {
		item.setDescription(itemDto2.getDescrption());
		item.setUrl(itemDto2.getUrl());

		if (null == item.getItemCategory()) {
			item.setItemCategory(new HashSet<>());
		}

		itemDto2.getItemCategory().stream().forEach(categoryName -> {
			ItemCategory itemCategory = itemCategoryRepository.findBycategoryName(categoryName);
			if (null == itemCategory) {
				itemCategory = new ItemCategory();
				itemCategory.setNewitem(new HashSet<>());
			}
			itemCategory.setCategoryName(categoryName);
			item.addCategory(itemCategory);
		});

		if (null == item.getTemplate()) {
			item.setTemplate(new HashSet<>());
		}

		itemDto2.getTemplates().stream().forEach(studentName -> {
			Template template = templateRepository.findByName(studentName);
			if (null == template) {
				template = new Template();
				template.setItems(new HashSet<>());
			}
			template.setName(studentName);

			template.addItem(item);
		});
	}

	private ItemDto2 mapEntityToDto2(Item item) {
		ItemDto2 responseDto = new ItemDto2();

		responseDto.setItemId(item.getItemId());
		responseDto.setDescrption(item.getDescription());
		responseDto.setUrl(item.getUrl());

		responseDto.setItemCategory(
				item.getItemCategory().stream().map(ItemCategory::getCategoryName).collect(Collectors.toSet()));
		responseDto.setTemplates(item.getTemplate().stream().map(Template::getName).collect(Collectors.toSet()));
		return responseDto;
	}

}
