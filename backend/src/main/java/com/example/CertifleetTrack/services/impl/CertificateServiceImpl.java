package com.example.CertifleetTrack.services.impl;

import com.example.CertifleetTrack.entites.Certificate;
import com.example.CertifleetTrack.entites.Ship;
import com.example.CertifleetTrack.repositories.ShipRepository;
import com.example.CertifleetTrack.services.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public abstract class CertificateServiceImpl<T extends Certificate, ID> implements CertificateService<T, ID> {

    @Autowired
    private ShipRepository shipRepository;

    protected final JpaRepository<T, ID> repository;

    public CertificateServiceImpl(JpaRepository<T, ID> repository) {
        this.repository = repository;
    }

    @Override
    public List<T> findAll() {
        return List.of();
    }

    @Override
    public List<T> saveNewCertificate(Integer imoNo, List<T> entities) throws Exception{
        Ship ship = shipRepository.findShipByImoNo(imoNo);
        if (ship == null) {
            throw new Exception("Кораб с такъв IMO номер не съществува");
        }
        entities.forEach(it -> it.setShip(ship));
        return this.repository.saveAll(entities);
    }

    @Override
    public T updateCertificate(Integer imoNo, T entityDetails) throws Exception {
        Ship ship = shipRepository.findShipByImoNo(imoNo);
        if (ship == null) {
            throw new Exception("Кораб с такъв IMO номер не съществува");
        }
        T updatedEntity = getByCertificateNumber(entityDetails.getCertificateNumber());
        updatedEntity.setCertificateType(entityDetails.getCertificateType());
        updatedEntity.setInspectionDate(entityDetails.getInspectionDate());
        updatedEntity.setReason(entityDetails.getReason());
        updatedEntity.setShip(ship);
        updatedEntity.setIssuedBy(entityDetails.getIssuedBy());
        updatedEntity.setIssuedIn(entityDetails.getIssuedIn());
        updatedEntity.setIssuedOn(entityDetails.getIssuedOn());
        updatedEntity.setStatus(entityDetails.getStatus());
        updatedEntity.setValidTo(entityDetails.getValidTo());

        return repository.save(updatedEntity);
    }

    @Override
    public abstract T getByCertificateNumber(Integer number);

    @Override
    public abstract List<T> getCertificateByImoNo(Integer imoNo);

    @Override
    public abstract T getCertificateByImoNoAndNumber(Integer imoNo, Integer number);


}
