package com.example.diploma.Entity;


import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "Radionuclide")
public class Radionuclide {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "doseRatePeroral")
    private Double doseRatePeroral;

    @Column(name = "doseRateInhal")
    private Double doseRateInhal;
}
