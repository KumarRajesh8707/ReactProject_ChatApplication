package com.mastercard.dxp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.mastercard.dxp.dto.ServiceRequestDto;
import com.mastercard.dxp.dto.ServiceRequestDto3;
import com.mastercard.dxp.dto.ServiceRequestDto4;
import com.mastercard.dxp.dto.ServiceRequestSrDto;
import com.mastercard.dxp.dto.SrResponse;

import com.mastercard.dxp.entity.ServiceRequest;

import com.mastercard.dxp.repository.ServiceRequestRepository;
import com.mastercard.dxp.service.SRService;

@RestController
@RequestMapping("/sr")
@CrossOrigin(origins = "*")
public class SRController {
	@Autowired
	private SRService sr;

	@PostMapping("/create-sr")
	public ResponseEntity<SrResponse> createServiceRequest(@RequestBody ServiceRequestDto serviceRequestDto) {

		return ResponseEntity.ok(sr.createServiceRequest(serviceRequestDto));
	}

	@PostMapping("/fetchSr/username")
	public ResponseEntity<List<ServiceRequest>> getbyName(@RequestBody ServiceRequestDto3 serviceRequestDto3) {
		List<ServiceRequest> requests = sr.getAllServiceRequestByUserName(serviceRequestDto3.getUserName());

		return new ResponseEntity<List<ServiceRequest>>(requests, HttpStatus.OK);

	}

	@PostMapping("/fetchSr/SrNumber")
	public ResponseEntity<ServiceRequestDto> getbyId(@RequestBody ServiceRequestSrDto serviceRequestDto) {
		ServiceRequestDto requests = sr.RequestById(serviceRequestDto.getSrNumber());
		return new ResponseEntity<ServiceRequestDto>(requests, HttpStatus.OK);
	}
	
	@GetMapping("/GetAllSR")
	public ResponseEntity<List<ServiceRequest>> getSR() {
		List<ServiceRequest> services = sr.getSR();
		return new ResponseEntity<>(services, HttpStatus.OK);
	}
	
	@GetMapping("/GetAllSrWithUserName")
	public ResponseEntity<List<ServiceRequestDto4>> getSRUR() {
		List<ServiceRequestDto4> servicesDto = sr.getSRUR();
		return new ResponseEntity<>(servicesDto, HttpStatus.OK);
	}


}
