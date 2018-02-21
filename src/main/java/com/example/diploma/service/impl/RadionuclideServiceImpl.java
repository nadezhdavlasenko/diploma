package com.example.diploma.service.impl;

import com.example.diploma.Entity.Radionuclide;
import com.example.diploma.Repository.RadionuclideRepository;
import com.example.diploma.service.RadionuclideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RadionuclideServiceImpl implements RadionuclideService {

    private final RadionuclideRepository radionuclideRepository;

    @Autowired
    public RadionuclideServiceImpl(RadionuclideRepository radionuclideRepository) {
        this.radionuclideRepository = radionuclideRepository;
    }
    @Override
    public List<Radionuclide> getAll() {
        return null;
    }
}
