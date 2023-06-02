package com.mastercard.dxp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mastercard.dxp.entity.status;
import com.mastercard.dxp.service.StatusService;

@RestController
@RequestMapping("/sr")
@CrossOrigin(origins = "*")
public class statusController {
	
	@Autowired
	StatusService statusService;
	@PostMapping("/status")
	public String  setStatus(@RequestBody status st) {
		statusService.createStatus(st);
		return "status Close successfully";
	}
	

}
