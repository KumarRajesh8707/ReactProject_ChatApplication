package com.mastercard.dxp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mastercard.dxp.dto.ServiceRequestDto;
import com.mastercard.dxp.dto.ServiceRequestDto4;
import com.mastercard.dxp.dto.SrResponse;
import com.mastercard.dxp.entity.Module;
import com.mastercard.dxp.entity.ServiceRequest;
import com.mastercard.dxp.entity.User_credential;
import com.mastercard.dxp.repository.ServiceRequestRepository;
import com.mastercard.dxp.repository.User_Repository;
/**
* 
* @author siddhartha.agrawal
*
*/
@Service
public class SRService {

	@Autowired
	private ServiceRequestRepository repo;
	@Autowired
	private User_Repository user_Repository;

	public SrResponse createServiceRequest(ServiceRequestDto serviceRequestDto) {
		ServiceRequest serviceRequest = new ServiceRequest();

		serviceRequest.setComments(serviceRequestDto.getComments());
		serviceRequest.setIssueType(serviceRequestDto.getIssueType());
//		serviceRequest.setStatus(serviceRequestDto.getStatus());
		serviceRequest.setAssignTo(serviceRequestDto.getAssignTo());

		User_credential userCredential = user_Repository.findById(serviceRequestDto.getUserName())
				.orElseThrow(() -> new RuntimeException("User not found"));
		serviceRequest.setUserCredential(userCredential);

		repo.save(serviceRequest);

		SrResponse srResponse = new SrResponse();
		srResponse.setSrNumber(serviceRequest.getSrNumber());
		srResponse.setResponse("Service Request created Successfully by " + serviceRequestDto.getUserName());
		return srResponse;

	}

	public ServiceRequestDto RequestById(Integer id) {
		ServiceRequest sr = repo.findById(id).get();
		ServiceRequestDto ob = new ServiceRequestDto();
		ob.setIssueType(sr.getIssueType());
		ob.setComments(sr.getComments());
		ob.setUserName(sr.getUserCredential().getUserName());
//		ob.setStatus(sr.getStatus());
		ob.setAssignTo(sr.getAssignTo());

		return ob;
	}

	public List<ServiceRequest> getAllServiceRequestByUserName(String userName) {
		List<ServiceRequest> requests = repo.findAllSRByuserCredential_userName(userName);
		return requests;
	}
	
	
	public List<ServiceRequest> getSR() {
		List<ServiceRequest> services = repo.findAll();
		return services;
	}
	
	
	
	
	public List<ServiceRequestDto4> getSRUR() {
		
		List<ServiceRequestDto4> moduleDtos = new ArrayList<>();
		List<ServiceRequest> modules = repo.findAll();
		modules.stream().forEach(module -> {
			ServiceRequestDto4 moduleDto = mapEntityToDto(module);
			moduleDtos.add(moduleDto);
		});
		return moduleDtos;
		
	}
	public ServiceRequestDto4 mapEntityToDto(ServiceRequest module) {
		ServiceRequestDto4 responseDto = new ServiceRequestDto4();
		responseDto.setSrNumber(module.getSrNumber());
		responseDto.setIssueType(module.getIssueType());
		responseDto.setComments(module.getComments());
		responseDto.setStatus(module.getStatus());
		responseDto.setAssignTo(module.getAssignTo());
		responseDto.setUserName(module.getUserCredential().getUserName());
		responseDto.setCreatedAt(module.getCreatedAt());
		responseDto.setUpdatedAt(module.getUpdatedAt());
		return responseDto;
	}


}
