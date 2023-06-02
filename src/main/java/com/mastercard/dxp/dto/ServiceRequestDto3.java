package com.mastercard.dxp.dto;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.springframework.beans.factory.annotation.Autowired;

import com.mastercard.dxp.entity.ServiceRequest;
import com.mastercard.dxp.repository.ServiceRequestRepository;
import com.mastercard.dxp.repository.User_Repository;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ServiceRequestDto3 {
	
	private String userName;
	

}
