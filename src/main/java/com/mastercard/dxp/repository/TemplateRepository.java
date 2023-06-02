package com.mastercard.dxp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mastercard.dxp.entity.Template;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Integer>{
	public Template findByName(String templateName);
	
	@Query("select template.id, template.name from Template template")
	public List<Object> getTemplateName();
    
	@Query("select t from Template t where t.name=?1")
	public Optional<Template> getByName(String name);
	
	 

}
