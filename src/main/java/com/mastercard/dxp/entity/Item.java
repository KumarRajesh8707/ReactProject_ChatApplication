package com.mastercard.dxp.entity;

/**
* 
* @author yash.mittal
* This is the Item Entity class
* this is entity
*
*/
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@javax.persistence.Entity
@Table(name = "ItemData")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int itemId;

	@Column
	private String description;
	@Column
	private String url;
	

	@ManyToMany(mappedBy = "items")

	private Set<Template> template;
	
	
	@ManyToMany
	@JoinTable(name="category_item", joinColumns = @JoinColumn(name = "item_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<ItemCategory> itemCategory;

	public void removeTemplate(Template template) {
		this.getTemplate().remove(template);
		template.getItems().remove(this);
	}

	public void removeTemplates() {
		for (Template template : new HashSet<>(template)) {
			removeTemplate(template);
		}
	}
   public void addCategory(ItemCategory itemCategory) {
	this.itemCategory.add(itemCategory);
	itemCategory.getNewitem().add(this);
     }
}
