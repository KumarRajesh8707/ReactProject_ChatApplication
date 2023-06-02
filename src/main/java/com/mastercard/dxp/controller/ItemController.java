package com.mastercard.dxp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mastercard.dxp.dto.ItemDto;
import com.mastercard.dxp.dto.ItemDto2;
import com.mastercard.dxp.repository.ItemRepository;
import com.mastercard.dxp.service.ItemService;

@RestController
@RequestMapping("/item")
@CrossOrigin(origins = "*")
public class ItemController {
	@Autowired
	private ItemService itemService;

	@PostMapping("/itemData")
	public ResponseEntity<ItemDto2> getAllItem(@RequestBody ItemDto2 itemDto) {
		try {
			ItemDto2 std = itemService.addItem(itemDto);
			return new ResponseEntity<>(std, HttpStatus.CREATED);
		} catch (DuplicateValueException e) {
			return ResponseEntity.badRequest().body(null);
		}

	}

	@GetMapping("/show")
	public ResponseEntity<List<ItemDto>> getAllItems() {
		List<ItemDto> templates = itemService.getAllItem();
		return new ResponseEntity<>(templates, HttpStatus.OK);
	}

	@PutMapping("/{itemId}")
	public ResponseEntity<ItemDto> updateItem(@PathVariable(name = "itemId") Integer itemId,
			@RequestBody ItemDto item) {
		ItemDto crs = itemService.updateItem(itemId, item);
		return new ResponseEntity<>(crs, HttpStatus.CREATED);
	}

	@DeleteMapping("/{itemId}")
	public ResponseEntity<String> deleteItem(@PathVariable(name = "itemId") Integer id) {
		String message = itemService.deleteItem(id);
		return new ResponseEntity<>(message, HttpStatus.OK);
	}

	@GetMapping("/{itemId}")
	public ResponseEntity<List<ItemDto>> getById(@PathVariable(name = "itemId") Integer id) {
		List<ItemDto> item = itemService.getItemById(id);
		return new ResponseEntity<>(item, HttpStatus.OK);

	}

	@GetMapping("/description/{name}")
	public ResponseEntity<List<ItemDto2>> getByName(@PathVariable String name) {
		List<ItemDto2> item = itemService.getItemByName(name);
		return new ResponseEntity<>(item, HttpStatus.OK);

	}

}