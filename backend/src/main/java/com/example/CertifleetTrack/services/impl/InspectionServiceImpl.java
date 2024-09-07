package com.example.CertifleetTrack.services.impl;


import com.example.CertifleetTrack.entites.Inspection;
import com.example.CertifleetTrack.entites.InspectionAdditionalInfo;
import com.example.CertifleetTrack.entites.Ship;
import com.example.CertifleetTrack.repositories.InspectionRepository;
import com.example.CertifleetTrack.repositories.ShipRepository;
import com.example.CertifleetTrack.services.EmailSenderService;
import com.example.CertifleetTrack.services.InspectionService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class InspectionServiceImpl implements InspectionService {
    @Autowired
    private InspectionRepository inspectionRepository;
    @Autowired
    private ShipRepository shipRepository;

    @Autowired
    EmailSenderService emailSenderService;

    @Override
    public Inspection saveNewInspection(Integer imoNo, Inspection inspection) throws Exception {
        Ship ship = shipRepository.findShipByImoNo(imoNo);
        if (ship == null) {
            throw new Exception("Кораб с такъв IMO номер не съществува");
        }
        inspection.setShip(ship);
        inspection.getAdditionalInfo().stream().forEach(it -> it.setInspection(inspection));
        return inspectionRepository.save(inspection);
    }

    @Override
    public List<Inspection> getInspectionsByImoNo(Integer imoNo) {
        return inspectionRepository.getInspectionByImoNo(imoNo);
    }

    @Override
    public Inspection getInspectionByImoNoAndStartingDate(Integer imoNo, LocalDate startingDate) {
        return inspectionRepository.getInspectionByImoNoAndStartingDate(imoNo, startingDate);
    }

    @Override
    @Transactional
    public Inspection updateInspection(Integer imoNo, Inspection updatedInspection) {

        Inspection existingInspection = inspectionRepository.getInspectionByImoNoAndStartingDate(imoNo, updatedInspection.getStartingDate());
        existingInspection.setPlace(updatedInspection.getPlace());
        existingInspection.setInspector(updatedInspection.getInspector());
        existingInspection.setEndingDate(updatedInspection.getEndingDate());
        existingInspection.setAdditionalDocuments(updatedInspection.getAdditionalDocuments());
        existingInspection.setStatus(updatedInspection.getStatus());
        existingInspection.setSendingDate(updatedInspection.getSendingDate());
        existingInspection.setEndingDate(updatedInspection.getEndingDate());
        existingInspection.setShip(this.shipRepository.findShipByImoNo(imoNo));
        existingInspection.setInstructionNo(updatedInspection.getInstructionNo());

        existingInspection.getAdditionalInfo().clear();

        for (InspectionAdditionalInfo newInfo : updatedInspection.getAdditionalInfo()) {
            newInfo.setInspection(existingInspection);
            existingInspection.getAdditionalInfo().add(newInfo);
        }

        return inspectionRepository.save(existingInspection);
    }

}
