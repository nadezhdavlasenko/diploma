package com.example.diploma.Controller;

import com.example.diploma.Entity.TypeOfRisk;
import com.example.diploma.service.TypeOfRiskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/typeofrisk")
public class TypeOfRiskController {

    private final TypeOfRiskService typeOfRiskService;
    @Autowired
    public TypeOfRiskController(TypeOfRiskService typeOfRiskService){
        this.typeOfRiskService = typeOfRiskService;
    }

    @GetMapping
    public List<TypeOfRisk> typeOfRisk(){
        return typeOfRiskService.getAll();

    }
}
