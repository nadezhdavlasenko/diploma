package com.example.diploma.service;

import com.example.diploma.dto.CalculateRiskRequestDto;
import com.example.diploma.dto.RiskCalculationResultDto;


public interface RiskAssessmentService {
    RiskCalculationResultDto calculate(CalculateRiskRequestDto dto);
}
