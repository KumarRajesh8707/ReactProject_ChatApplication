package com.mastercard.dxp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mastercard.dxp.entity.Module;
import com.mastercard.dxp.dto.ModuleDto;
import com.mastercard.dxp.service.ModuleService;

@RestController
@CrossOrigin(origins = "*")
public class ModuleController {

	@Autowired
	private ModuleService moduleService;

	
	@GetMapping("/modules")
	public ResponseEntity<List<ModuleDto>> getAllModule() {
		List<ModuleDto> modules = moduleService.getAllModule();
		return new ResponseEntity<>(modules, HttpStatus.OK);
	}

	@PostMapping("/module")
	public ResponseEntity<ModuleDto> getAllModule(@RequestBody ModuleDto moduleDto) {
		ModuleDto std = moduleService.addModule(moduleDto);
		return new ResponseEntity<>(std, HttpStatus.CREATED);
	}

	@PutMapping("/module/{id}")
	public ResponseEntity<ModuleDto> updateModule(@PathVariable(name = "id") Integer id,
			@RequestBody ModuleDto module) {
		ModuleDto std = moduleService.updateModule(id, module);
		return new ResponseEntity<>(std, HttpStatus.CREATED);
	}

	@DeleteMapping("/module/{id}")
	public ResponseEntity<String> deleteModule(@PathVariable(name = "id") Integer moduleId) {
		String message = moduleService.deleteModule(moduleId);
		return new ResponseEntity<>(message, HttpStatus.OK);
	}

	@GetMapping("/moduleName")
	public ResponseEntity<List<Module>> getModuleName() {
		List<Module> module = moduleService.getModuleName();
		return new ResponseEntity<>(module, HttpStatus.OK);
	}

	@GetMapping("/module/{id}")
	public ResponseEntity<List<ModuleDto>> getById(@PathVariable Integer id) {
		List<ModuleDto> modules = moduleService.getModuleById(id);
		return new ResponseEntity<>(modules, HttpStatus.OK);

	}
}