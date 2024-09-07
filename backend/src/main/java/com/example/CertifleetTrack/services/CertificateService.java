package com.example.CertifleetTrack.services;


import com.example.CertifleetTrack.entites.Certificate;

import java.util.List;

public interface CertificateService<T extends Certificate, ID> {
    List<T> findAll();
   T getByCertificateNumber(Integer number);
   T getCertificateByImoNoAndNumber(Integer imoNo, Integer number);
   List<T> saveNewCertificate(Integer imoNo, List<T> entity) throws Exception;
   T updateCertificate(Integer number, T entityDetails) throws Exception;
   List<T> getCertificateByImoNo(Integer imoNo);
}
