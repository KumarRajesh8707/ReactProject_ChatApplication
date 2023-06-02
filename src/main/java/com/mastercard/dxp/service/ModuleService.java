package com.mastercard.dxp.service;

import java.util.List;

import com.mastercard.dxp.dto.ModuleDto;
import com.mastercard.dxp.entity.Module;

public interface ModuleService {

	public ModuleDto addModule(ModuleDto moduleDto);

	public List<ModuleDto> getAllModule();

	public ModuleDto updateModule(Integer mduleId, ModuleDto moduleDto);

	public String deleteModule(Integer moduleId);

	public List<Module> getModuleName();

	public List<ModuleDto> getModuleById(Integer id);
}
