package com.mastercard.dxp.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Template {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "Description")
	private String Description;

	@ManyToMany(mappedBy = "templates")
	private Set<Module> modules;

	@ManyToMany
	@JoinTable(name = "template_item", joinColumns = @JoinColumn(name = "template_id"), inverseJoinColumns = @JoinColumn(name = "item_id"))

	private Set<Item> items;

	public void addItem(Item item) {
		this.items.add(item);
		item.getTemplate().add(this);
	}

	public void removeModule(Module module) {
		this.getModules().remove(module);
		module.getTemplates().remove(this);
	}

	public void removeModules() {
		for (Module module : new HashSet<>(modules)) {
			removeModule(module);
		}
	}
}
