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

import com.mastercard.dxp.controller.DuplicateValueException;
import com.mastercard.dxp.dto.ModuleDto;
import com.mastercard.dxp.entity.Module;
import com.mastercard.dxp.entity.Template;
import com.mastercard.dxp.repository.ModuleRepository;
import com.mastercard.dxp.repository.TemplateRepository;

@Service
public class ModuleServiceImpl implements ModuleService {
	@Autowired
	private ModuleRepository moduleRepository;

	@Autowired
	private TemplateRepository templateRepository;

	@Transactional
	@Override
	public ModuleDto addModule(ModuleDto moduleDto) {
		if (moduleRepository.findByName(moduleDto.getName()) != null) {
			return null;
		} else {

			Module module = new Module();
			mapDtoToEntity(moduleDto, module);
			Module savedModule = moduleRepository.save(module);
			return mapEntityToDto(savedModule);

		}
	}

	@Override
	public List<ModuleDto> getAllModule() {
		List<ModuleDto> moduleDtos = new ArrayList<>();
		List<Module> modules = moduleRepository.findAll();
		modules.stream().forEach(module -> {
			ModuleDto moduleDto = mapEntityToDto(module);
			moduleDtos.add(moduleDto);
		});
		return moduleDtos;
	}

	@Transactional
	@Override
	public ModuleDto updateModule(Integer id, ModuleDto moduleDto) {
		Module std = moduleRepository.getOne(id);
		std.getTemplates().clear();
		mapDtoToEntity(moduleDto, std);
		Module module = moduleRepository.save(std);
		return mapEntityToDto(module);
	}

	@Override
	public String deleteModule(Integer moduleId) {

		Optional<Module> module = moduleRepository.findById(moduleId);
		if (module.isPresent()) {
			module.get().removeTemplates();
			moduleRepository.deleteById(module.get().getId());
			return "Module with id: " + moduleId + " deleted successfully!";
		}
		return null;
	}

	public void mapDtoToEntity(ModuleDto moduleDto, Module module) {
		module.setName(moduleDto.getName());
		module.setDescription(moduleDto.getDescription());
		if (null == module.getTemplates()) {
			module.setTemplates(new HashSet<>());
		}
		moduleDto.getTemplates().stream().forEach(templateName -> {
			Template template = templateRepository.findByName(templateName);
			if (null != template) {
				template.setName(templateName);
				module.addTemplate(template);
			}

		});
	}

	public ModuleDto mapEntityToDto(Module module) {
		ModuleDto responseDto = new ModuleDto();
		responseDto.setName(module.getName());
		responseDto.setId(module.getId());
		responseDto.setDescription(module.getDescription());
		responseDto.setTemplates(module.getTemplates().stream().map(Template::getName).collect(Collectors.toSet()));
		return responseDto;
	}

	@Override
	public List<Module> getModuleName() {
		List module = moduleRepository.getModuleName();
		return module;
	}

	@Override
	public List<ModuleDto> getModuleById(Integer id) {
		List<ModuleDto> moduleDtos = new ArrayList<>();
		Optional<Module> module = moduleRepository.findById(id);
		module.stream().forEach(modules -> {
			ModuleDto moduleDto = mapEntityToDto(modules);
			moduleDtos.add(moduleDto);
		});
		return moduleDtos;
	}

}
