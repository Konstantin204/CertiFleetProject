package com.example.CertifleetTrack.controllers;

import com.example.CertifleetTrack.entites.TemporaryCertificate;
import com.example.CertifleetTrack.services.TemporaryCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/temporary-certificate")
public class TemporaryCertificateController extends CertificateController<TemporaryCertificate, Long>{

    @Autowired
    public TemporaryCertificateController(TemporaryCertificateService temporaryCertificateService) {
        super(temporaryCertificateService);
    }
}
