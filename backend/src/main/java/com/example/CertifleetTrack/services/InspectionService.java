package com.example.CertifleetTrack.services;

import com.example.CertifleetTrack.entites.Inspection;

import java.time.LocalDate;
import java.util.List;

public interface InspectionService {
    Inspection saveNewInspection(Integer imoNo, Inspection inspection) throws Exception;
    Inspection updateInspection(Integer imoNo, Inspection updatedInspection);
    List<Inspection> getInspectionsByImoNo(Integer imoNo);
    Inspection getInspectionByImoNoAndStartingDate(Integer imoNo, LocalDate startingDate);
}
