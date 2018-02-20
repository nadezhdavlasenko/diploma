package com.example.diploma.Controller;

import com.example.diploma.dto.CalculateRiskRequestDto;
import com.example.diploma.dto.RiskCalculationResultDto;
import com.example.diploma.service.RiskAssessmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping(value = "/riskAssessment")
public class RiskAssessmentController {



    @Autowired
    private RiskAssessmentService riskAssessmentService;

    @GetMapping("/calculate")
    public RiskCalculationResultDto riskAssessment(CalculateRiskRequestDto dto){

        return riskAssessmentService.calculate(dto);
    }

}
