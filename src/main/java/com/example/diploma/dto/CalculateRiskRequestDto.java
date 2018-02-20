package com.example.diploma.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculateRiskRequestDto {

    private long cityId;
    private long riskTypeId;
    private long radionuclideId;
    private double specificRadionuclideActivity;
}
