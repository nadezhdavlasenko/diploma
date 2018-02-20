package com.example.diploma.Entity;


import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "TypeOfRisk")
public class TypeOfRisk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "consumptionAmount")
    private Double consumptionAmount;


}
