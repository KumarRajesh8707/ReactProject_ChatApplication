package com.mastercard.dxp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mastercard.dxp.entity.Module;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer>{
	
	Module findByName(String ModuleName);
	@Query("select module.id, module.name from Module module")
	public List<Object> getModuleName();
	

}
