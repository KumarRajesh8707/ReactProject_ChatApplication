package com.mastercard.dxp.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mastercard.dxp.dto.TemplateDto;
import com.mastercard.dxp.entity.Item;
import com.mastercard.dxp.entity.Template;
import com.mastercard.dxp.repository.ItemRepository;
import com.mastercard.dxp.repository.ModuleRepository;
import com.mastercard.dxp.repository.TemplateRepository;

@Service
public class TemplateServiceImpl implements TemplateService {

	@Autowired
	private ModuleRepository moduleRepository;

	@Autowired
	private TemplateRepository templateRepository;

	@Autowired
	private ItemRepository itemRepository;

	@Transactional
	@Override
	public TemplateDto addTemplate(TemplateDto templateDto) {

		if (templateRepository.findByName(templateDto.getName()) != null) {
			return null;
		} else {
			Template template = new Template();
			mapDtoToEntity(templateDto, template);
			Template savedTemplate = templateRepository.save(template);
			return mapEntityToDto(savedTemplate);
		}
	}

	@Override
	public List<TemplateDto> getAllTemplate() {
		List<TemplateDto> templateDtos = new ArrayList<>();
		List<Template> templates = templateRepository.findAll();
		templates.stream().forEach(template -> {
			TemplateDto templateDto = mapEntityToDto(template);
			templateDtos.add(templateDto);
		});
		return templateDtos;
	}

	@Transactional
	@Override
	public TemplateDto updateTemplate(Integer id, TemplateDto templateDto) {
		Template crs = templateRepository.getOne(id);
		crs.getModules().clear();
		mapDtoToEntity(templateDto, crs);
		Template template = templateRepository.save(crs);
		return mapEntityToDto(template);
	}

	@Transactional
	@Override
	public String deleteTemplate(Integer id) {
		Optional<Template> template = templateRepository.findById(id);

		if (template.isPresent()) {
			template.get().removeModules();
			templateRepository.deleteById(template.get().getId());
			return "Template with id: " + id + " deleted successfully!";
		}
		return null;
	}

	private void mapDtoToEntity(TemplateDto templateDto, Template template) {
		template.setName(templateDto.getName());
		template.setDescription(templateDto.getDescription());

		if (null == template.getItems()) {
			template.setItems(new HashSet<>());
		}

		templateDto.getItems().stream().forEach(description -> {
			Item item = itemRepository.findByDescription(description);
			if (null == item) {
				item = new Item();
				item.setTemplate(new HashSet<>());
			}
			item.setDescription(description);

			template.addItem(item);
		});
	}

	private TemplateDto mapEntityToDto(Template template) {
		TemplateDto responseDto = new TemplateDto();
		responseDto.setName(template.getName());
		responseDto.setId(template.getId());
		responseDto.setDescription(template.getDescription());
		responseDto.setItems(template.getItems().stream().map(Item::getDescription).collect(Collectors.toSet()));
		return responseDto;
	}

	@Override
	public List<Template> getTemplateName() {
		List template = templateRepository.getTemplateName();
		return template;
	}

	@Override
	public List<TemplateDto> getTemplateByName(String name) {
		List<TemplateDto> templateDtos = new ArrayList<>();
		Optional<Template> template = templateRepository.getByName(name);
		template.stream().forEach(templates -> {
			TemplateDto templateDto = mapEntityToDto(templates);
			templateDtos.add(templateDto);
		});
		return templateDtos;
	}

	@Override
	public List<TemplateDto> getTemplateById(Integer id) {
		List<TemplateDto> templateDtos = new ArrayList<>();
		Optional<Template> template = templateRepository.findById(id);
		template.stream().forEach(templates -> {
			TemplateDto templateDto = mapEntityToDto(templates);
			templateDtos.add(templateDto);
		});
		return templateDtos;
	}
}
