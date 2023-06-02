package com.mastercard.dxp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.yaml.snakeyaml.events.Event.ID;

import com.mastercard.dxp.entity.status;

public interface statusRepo extends JpaRepository<status, ID> {

}
