package com.mastercard.dxp.service;

import java.util.List;

import com.mastercard.dxp.dto.TemplateDto;
import com.mastercard.dxp.entity.Template;

public interface TemplateService {

	public TemplateDto updateTemplate(Integer id, TemplateDto course);

	public String deleteTemplate(Integer id);

	public TemplateDto addTemplate(TemplateDto templateDto);

	public List<TemplateDto> getAllTemplate();

	public List<Template> getTemplateName();

	public List<TemplateDto> getTemplateById(Integer id);

	List<TemplateDto> getTemplateByName(String name);
}