package com.mastercard.dxp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mastercard.dxp.entity.ServiceRequest;
import com.mastercard.dxp.entity.status;
import com.mastercard.dxp.repository.ServiceRequestRepository;

@Service	
public class StatusService {
	@Autowired
	ServiceRequestRepository repo;

	public void createStatus(status st) {
		ServiceRequest sr=repo.findById(st.getSrid()).orElseThrow(() -> new RuntimeException("sr not found"));
		 
		sr.setStatus("Closed");
		
		repo.save(sr);

		
	}

}
