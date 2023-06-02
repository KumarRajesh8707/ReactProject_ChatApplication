package com.mastercard.dxp.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
/**
* 
* @author sarabjeet.singh
* This is the Module Entity class
* this is entity
*
*/
@Entity
@Getter
@Setter
@Data
@Table(name="SR")
public class ServiceRequest {
	
	 

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "sr_generator")
	@SequenceGenerator
	(name="sr_generator", initialValue = 856532)
	
	
	int srNumber;
	
	
	String issueType;
	
	
	String comments;
	
	String status="open";
	
	String AssignTo;
	
	@CreationTimestamp
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Column(name="created_at",nullable=false,updatable=false)
	private  LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name="updated_at")
	private LocalDateTime  updatedAt;
	
    @ManyToOne()
    @JoinColumn(name = "userName", referencedColumnName = "username")
    @JsonIgnore
    private User_credential userCredential;
    
    
   

	
	
}
