package com.mastercard.dxp.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class UserChat {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator = "chat_generator")
	@SequenceGenerator
	(name="chat_generator", initialValue = 745421)
	int id;
	String chatType;
	String chatMessages;
	
	@ManyToOne()
    @JoinColumn(name = "srNumber", referencedColumnName = "SrNumber")
	@JsonIgnore
    private ServiceRequest servicerequest;
	

	 

}
