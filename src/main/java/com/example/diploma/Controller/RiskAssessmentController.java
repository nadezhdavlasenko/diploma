package com.example.diploma.Controller;

import com.example.diploma.dto.CalculateRiskRequestDto;
import com.example.diploma.dto.RiskCalculationResultDto;
import com.example.diploma.service.RiskAssessmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/riskAssessment")
public class RiskAssessmentController {

    private final RiskAssessmentService riskAssessmentService;

    @Autowired
    public RiskAssessmentController(RiskAssessmentService riskAssessmentService) {
        this.riskAssessmentService = riskAssessmentService;
    }

    @GetMapping("/calculate")
    public RiskCalculationResultDto riskAssessment(CalculateRiskRequestDto dto){

        return riskAssessmentService.calculate(dto);
    }

}
