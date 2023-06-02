package com.mastercard.dxp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mastercard.dxp.entity.Module;
import com.mastercard.dxp.entity.ServiceRequest;
import com.mastercard.dxp.entity.User_credential;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest,Integer> {

	List<ServiceRequest> findAllSRByuserCredential_userName(String userName);

	

}
