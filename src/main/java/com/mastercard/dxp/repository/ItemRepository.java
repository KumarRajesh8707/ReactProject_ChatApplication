package com.mastercard.dxp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mastercard.dxp.entity.Item;



@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

	 Item findByDescription(String description);
	 
	 @Query("select I from Item I where I.description=?1")
	 Optional<Item> getByDescription(String description);

	
	
}
