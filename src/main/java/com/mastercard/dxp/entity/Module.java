package com.mastercard.dxp.entity;

/**
* 
* @author sarabjeet.singh
* This is the Module Entity class
* this is entity
*
*/
import java.util.HashSet;
import java.util.Set;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Module {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "Description")
	private String description;

	@ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
	@JoinTable(name = "Module_template", joinColumns = { @JoinColumn(name = "Module_ID") }, inverseJoinColumns = {
			@JoinColumn(name = "Template_ID") })
	private Set<Template> templates;

	public void addTemplate(Template template) {
		this.templates.add(template);
		template.getModules().add(this);
	}

	public void removeTemplate(Template template) {
		this.getTemplates().remove(template);
		template.getModules().remove(this);
	}

	public void removeTemplates() {
		for (Template template : new HashSet<>(templates)) {
			removeTemplate(template);
		}
	}

	 
}
