package com.example.diploma.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskCalculationResultDto {

    private double effectiveDosage;
    private double individualRisk;
    private double collectiveDosage;
    private double collectiveRadiationRisk;
    private double damageCost;

}
