package com.example.diploma.Controller;

import com.example.diploma.service.TypeOfRiskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/typeofrisk")
public class TypeOfRiskController {

    private final TypeOfRiskService typeOfRiskService;
    @Autowired
    public TypeOfRiskController(TypeOfRiskService typeOfRiskService){
        this.typeOfRiskService = typeOfRiskService;
    }

    @GetMapping
    public String typeOfRisk(Model model){
        model.addAttribute("list", typeOfRiskService.getAll());
        return "typeOfRisk";
    }
}
