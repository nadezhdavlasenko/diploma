package com.example.diploma.service.impl;

import com.example.diploma.Entity.TypeOfRisk;
import com.example.diploma.Repository.TypeOfRiskRepository;
import com.example.diploma.service.TypeOfRiskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TypeOfRiskServiceImpl implements TypeOfRiskService {

    private final TypeOfRiskRepository typeOfRiskRepository;

    @Autowired
    public  TypeOfRiskServiceImpl(TypeOfRiskRepository typeOfRiskRepository){
        this.typeOfRiskRepository = typeOfRiskRepository;
    }

    @Override
    public List<TypeOfRisk> getAll() {
        List<TypeOfRisk> typeOfRiskList = new ArrayList<>();
        typeOfRiskRepository.findAll().forEach(typeOfRiskList::add);
        return typeOfRiskList;
    }
}
