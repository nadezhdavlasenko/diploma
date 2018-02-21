package com.example.diploma.service.impl;

import com.example.diploma.Repository.CityRepository;
import com.example.diploma.Repository.RadionuclideRepository;
import com.example.diploma.Repository.TypeOfRiskRepository;
import com.example.diploma.dto.CalculateRiskRequestDto;
import com.example.diploma.dto.RiskCalculationResultDto;
import com.example.diploma.service.RiskAssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RiskAssessmentServiceImpl implements RiskAssessmentService {

    private final TypeOfRiskRepository typeOfRiskRepository;
    private final RadionuclideRepository radionuclideRepository;
    private final CityRepository cityRepository;

    @Autowired
    public RiskAssessmentServiceImpl(CityRepository cityRepository, RadionuclideRepository radionuclideRepository, TypeOfRiskRepository typeOfRiskRepository) {
        this.cityRepository = cityRepository;
        this.radionuclideRepository = radionuclideRepository;
        this.typeOfRiskRepository = typeOfRiskRepository;
    }

    @Override
    public RiskCalculationResultDto calculate(CalculateRiskRequestDto dto) {
        RiskCalculationResultDto riskCalculationResultDto = new RiskCalculationResultDto();

        int time = 10;

        double totalActivityOfRadionuclide = dto.getSpecificRadionuclideActivity() *
                typeOfRiskRepository.findOne(dto.getRiskTypeId()).getConsumptionAmount() *
                time;

        if (radionuclideRepository.findOne(dto.getRadionuclideId()).getName().equals("Вдыхание воздуха")) {


            riskCalculationResultDto.setEffectiveDosage(totalActivityOfRadionuclide *
            radionuclideRepository.findOne(dto.getRadionuclideId()).getDoseRateInhal());

        } else riskCalculationResultDto.setEffectiveDosage(totalActivityOfRadionuclide *
                radionuclideRepository.findOne(dto.getRadionuclideId()).getDoseRatePeroral());

        double coefficientOfIndividualRadiationRisk = 0.073;

        riskCalculationResultDto.setIndividualRisk(riskCalculationResultDto.getEffectiveDosage() *
        coefficientOfIndividualRadiationRisk);

        riskCalculationResultDto.setCollectiveDosage(riskCalculationResultDto.getEffectiveDosage() *
        cityRepository.findOne(dto.getCityId()).getPopulation());

        riskCalculationResultDto.setCollectiveRadiationRisk(riskCalculationResultDto.getCollectiveDosage() *
        coefficientOfIndividualRadiationRisk);

        double costOf1PersonInUkraine = 4000;

        riskCalculationResultDto.setDamageCost(riskCalculationResultDto.getCollectiveRadiationRisk() *
        costOf1PersonInUkraine);

        return riskCalculationResultDto;
    }
}
