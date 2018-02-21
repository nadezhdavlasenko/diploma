package com.example.diploma.Controller;


import com.example.diploma.service.RadionuclideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/radionuclide")
public class RadionuclideController {

    private final RadionuclideService radionuclideService;

    @Autowired
    public RadionuclideController(RadionuclideService radionuclideService) {
        this.radionuclideService = radionuclideService;
    }

    @GetMapping
    public String radionuclide(Model model){
        model.addAttribute("list", radionuclideService.getAll());
        return "radionuclide";
    }
}
