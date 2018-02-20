package com.example.diploma.Repository;

import com.example.diploma.Entity.Radionuclide;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RadionuclideRepository extends CrudRepository<Radionuclide, Long> {
}
