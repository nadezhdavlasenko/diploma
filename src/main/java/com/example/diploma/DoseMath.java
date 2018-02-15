package com.example.diploma;

import java.util.ArrayList;

public class DoseMath {


    public static double doseOrgan(double totaEnergy, double mass){

        return totaEnergy/mass;

    }

    public static double doseEquivalent(double doseOrgan, double radiationWeighingFactor){
        return doseOrgan*radiationWeighingFactor;
    }

    public static double doseEffective(ArrayList<Double> doseEquivalentList, ArrayList<Double> fabricWeighingFactor){
        double result = 0;
        for (int i = 0 ; i < doseEquivalentList.size(); i++){
            result = result + doseEquivalentList.get(i) * fabricWeighingFactor.get(i);
        }
        return result;

    }
}
