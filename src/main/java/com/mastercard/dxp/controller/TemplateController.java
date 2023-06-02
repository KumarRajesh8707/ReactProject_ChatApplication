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
import com.mastercard.dxp.dto.TemplateDto;
import com.mastercard.dxp.entity.Template;
import com.mastercard.dxp.service.TemplateService;

@RestController
@CrossOrigin(origins = "*")
public class TemplateController {

	@Autowired
	private TemplateService templateService;

	@GetMapping("/templates")
	public ResponseEntity<List<TemplateDto>> getAllTemplates() {
		List<TemplateDto> modules = templateService.getAllTemplate();
		return new ResponseEntity<>(modules, HttpStatus.OK);
	}

	@PostMapping("/template")
	public ResponseEntity<TemplateDto> getAllTemplate(@RequestBody TemplateDto templateDto) {
		TemplateDto std = templateService.addTemplate(templateDto);
		return new ResponseEntity<>(std, HttpStatus.CREATED);
	}

	@PutMapping("/template/{id}")
	public ResponseEntity<TemplateDto> updateTemplate(@PathVariable(name = "id") Integer id,
			@RequestBody TemplateDto template) {
		TemplateDto crs = templateService.updateTemplate(id, template);
		return new ResponseEntity<>(crs, HttpStatus.CREATED);
	}

	@DeleteMapping("/template/{id}")
	public ResponseEntity<String> deleteTemplate(@PathVariable(name = "id") Integer id) {
		String message = templateService.deleteTemplate(id);
		return new ResponseEntity<>(message, HttpStatus.OK);
	}

	@GetMapping("/templateName")
	public ResponseEntity<List<Template>> getTemplateName() {
		List<Template> template = templateService.getTemplateName();
		return new ResponseEntity<>(template, HttpStatus.OK);
	}

	@GetMapping("/template/{id}")
	public ResponseEntity<List<TemplateDto>> getById(@PathVariable Integer id) {
		List<TemplateDto> template = templateService.getTemplateById(id);
		return new ResponseEntity<>(template, HttpStatus.OK);

	}

	@GetMapping("/templates/{name}")
	public ResponseEntity<List<TemplateDto>> getByName(@PathVariable String name) {
		List<TemplateDto> template = templateService.getTemplateByName(name);
		return new ResponseEntity<>(template, HttpStatus.OK);
	}

}