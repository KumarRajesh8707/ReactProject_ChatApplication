package com.mastercard.dxp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mastercard.dxp.entity.ServiceRequest;
import com.mastercard.dxp.entity.UserChat;

@Repository
public interface UserChatRepository extends JpaRepository<UserChat, Integer> {

	List<UserChat> findAlluserchatByservicerequest_srNumber(int srNumber);

	List<UserChat> findAlluserchatByservicerequest_userCredential_userName(String userName);


}
