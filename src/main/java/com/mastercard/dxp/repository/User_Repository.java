package com.mastercard.dxp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mastercard.dxp.entity.User_credential;


@Repository
public interface User_Repository extends JpaRepository<User_credential, String> {

	User_credential findByUserName(String userName);
	
	

}