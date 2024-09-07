package com.example.CertifleetTrack.repositories;

import com.example.CertifleetTrack.entites.PermanentCertificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermanentCertificateRepository extends JpaRepository<PermanentCertificate, Long> {

    @Query("SELECT pc FROM PermanentCertificate pc WHERE pc.certificateNumber = :certificateNo")
    PermanentCertificate getByCertificateNumber(@Param("certificateNo") Integer certificateNo);

    @Query("SELECT pc FROM PermanentCertificate pc WHERE pc.ship.imoNo = :imoNo")
    List<PermanentCertificate> getCertificateByImoNo(@Param("imoNo") Integer imoNo);

    @Query("SELECT pc FROM PermanentCertificate pc WHERE pc.ship.imoNo = :imoNo AND pc.certificateNumber = :certificateNo")
    PermanentCertificate getByCertificateNumberAndNumber(@Param("imoNo") Integer imoNo, @Param("certificateNo") Integer certificateNo);


}
