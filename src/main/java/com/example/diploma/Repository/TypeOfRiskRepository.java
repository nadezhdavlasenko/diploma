package com.example.diploma.Repository;

import com.example.diploma.Entity.TypeOfRisk;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeOfRiskRepository extends CrudRepository<TypeOfRisk, Long> {
}
