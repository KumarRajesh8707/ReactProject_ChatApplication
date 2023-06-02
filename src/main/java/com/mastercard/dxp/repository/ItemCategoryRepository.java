package com.mastercard.dxp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mastercard.dxp.entity.ItemCategory;
@Repository
public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Integer> {

	ItemCategory findBycategoryName(String categoryName);

	
	@Query("select itemCategory.categoryId, itemCategory.categoryName from ItemCategory itemCategory")
	public List<Object> getCategoryName();


	@Query("select c from ItemCategory c where c.categoryName=?1")
	Optional<ItemCategory> getByName(String categoryName);


	

	
	

}
