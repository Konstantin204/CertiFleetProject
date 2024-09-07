package com.example.CertifleetTrack.controllers;


import com.example.CertifleetTrack.entites.Certificate;
import com.example.CertifleetTrack.services.CertificateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class CertificateController<T extends Certificate, ID> {

    protected final CertificateService<T, ID> certificateService;

    public CertificateController(CertificateService<T, ID> certificateService) {
        this.certificateService = certificateService;
    }


    @GetMapping("/get-all")
    public List<T> fetchAll() {
        return certificateService.findAll();
    }

    @GetMapping("/get-by-number/{number}")
    public T getByCertificateNumber(@PathVariable Integer number) {
        return certificateService.getByCertificateNumber(number);
    }

    @GetMapping("/get-by-imoNo/{number}")
    public List<T> getCertificateByImoNo(@PathVariable Integer number) {
        return certificateService.getCertificateByImoNo(number);
    }

    @GetMapping("/get-by-imoNo-and-number")
    public T getCertificateByImoNoAndNumber(@RequestParam("imoNo") Integer imoNo, @RequestParam("certNumber") Integer certNumber) {
        return certificateService.getCertificateByImoNoAndNumber(imoNo, certNumber);
    }


    @PostMapping("/save")
    public ResponseEntity<Object> saveNew(@RequestParam Integer imoNo, @RequestBody List<T> entity) {
        try{
            List<T> savedEntity = certificateService.saveNewCertificate(imoNo, entity);
            return new ResponseEntity<>(savedEntity, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> edit(@RequestParam("imoNo") Integer number, @RequestBody T entityDetails) {
        try{
            T entity = certificateService.updateCertificate(number, entityDetails);
            return new ResponseEntity<>(entity, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
