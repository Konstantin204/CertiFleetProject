package com.example.CertifleetTrack.controllers;


import com.example.CertifleetTrack.entites.PermanentCertificate;
import com.example.CertifleetTrack.services.PermanentCertificateService;
import io.micrometer.observation.annotation.Observed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/permanent-certificate")
public class PermanentCertificateController extends CertificateController<PermanentCertificate, Long> {
    @Autowired
    public PermanentCertificateController( PermanentCertificateService permanentCertificateService) {
        super(permanentCertificateService);
    }

}
