package com.example.CertifleetTrack.controllers;


import com.example.CertifleetTrack.entites.Inspection;
import com.example.CertifleetTrack.services.InspectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/inspection")
public class InspectionController {

    @Autowired
    private InspectionService inspectionService;

    @PostMapping("/save")
    public ResponseEntity<Object> saveNewInspection(@RequestParam Integer imoNo, @RequestBody Inspection inspection){
            try{
                Inspection savedInspection = inspectionService.saveNewInspection(imoNo, inspection);
                return new ResponseEntity<>(savedInspection, HttpStatus.OK);
            }catch (Exception e){
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateInspection(@RequestParam Integer imoNo, @RequestBody Inspection updatedInspection) {
        try{
            Inspection savedInspection = inspectionService.updateInspection(imoNo, updatedInspection);
            return new ResponseEntity<>(savedInspection, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get-by-imoNo/{imoNo}")
    public List<Inspection> getInspectionByImoNo(@PathVariable Integer imoNo) {
        return inspectionService.getInspectionsByImoNo(imoNo);
    }

    @GetMapping("/get-by-imoNo-and-startingDate")
    public Inspection getInspectionByImoNoAndStartingDate(@RequestParam("imoNo") Integer imoNo, @RequestParam("startingDate") LocalDate startingDate) {
        return inspectionService.getInspectionByImoNoAndStartingDate(imoNo, startingDate);
    }

}
