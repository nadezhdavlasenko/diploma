package com.example.diploma.service.impl;

import com.example.diploma.Entity.City;
import com.example.diploma.Repository.CityRepository;
import com.example.diploma.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public List<City> getAll() {
        List<City> cityList = new ArrayList<>();
        cityRepository.findAll().forEach(cityList::add);
        return cityList;
    }
}
