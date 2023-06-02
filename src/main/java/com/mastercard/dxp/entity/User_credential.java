package com.mastercard.dxp.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import javax.validation.constraints.Email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
* 
* @author sarabjeet.singh
* This is the Module Entity class
* this is entity
*
*/
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User_credential {
    @Id
    @Column(name = "username")
    private String userName;
    @Column
    @Email(message = "Email address is not valid !!")
	private String Email;
	@Column
	private String password;
	@Column
	private String Confirm_password;
	
}





