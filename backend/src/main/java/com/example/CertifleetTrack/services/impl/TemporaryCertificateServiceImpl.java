package com.example.CertifleetTrack.services.impl;

import com.example.CertifleetTrack.entites.PermanentCertificate;
import com.example.CertifleetTrack.entites.Ship;
import com.example.CertifleetTrack.entites.TemporaryCertificate;
import com.example.CertifleetTrack.repositories.ShipRepository;
import com.example.CertifleetTrack.repositories.TemporaryCertificateRepository;
import com.example.CertifleetTrack.services.TemporaryCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemporaryCertificateServiceImpl extends CertificateServiceImpl<TemporaryCertificate, Long> implements TemporaryCertificateService {


    @Autowired
    private ShipRepository shipRepository;

    private final TemporaryCertificateRepository temporaryCertificateRepository;

    @Autowired
    public TemporaryCertificateServiceImpl(@Qualifier("temporaryCertificateRepository") TemporaryCertificateRepository temporaryCertificateRepository) {
        super(temporaryCertificateRepository);
        this.temporaryCertificateRepository = temporaryCertificateRepository;
    }

    @Override
    public TemporaryCertificate getByCertificateNumber(Integer number) {
        return temporaryCertificateRepository.getByCertificateNumber(number);
    }

    @Override
    public List<TemporaryCertificate> getCertificateByImoNo(Integer imoNo) {
        return temporaryCertificateRepository.getCertificateByImoNo(imoNo);
    }

    @Override
    public TemporaryCertificate getCertificateByImoNoAndNumber(Integer imoNo, Integer number){
        return temporaryCertificateRepository.getByCertificateNumberAndNumber(imoNo, number);
    };

}
