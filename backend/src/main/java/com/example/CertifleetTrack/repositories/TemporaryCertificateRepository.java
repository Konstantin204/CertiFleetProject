package com.example.CertifleetTrack.repositories;
import com.example.CertifleetTrack.entites.TemporaryCertificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemporaryCertificateRepository extends JpaRepository<TemporaryCertificate, Long> {
    @Query("SELECT tc FROM TemporaryCertificate tc WHERE tc.certificateNumber = :certificateNo")
    TemporaryCertificate getByCertificateNumber(@Param("certificateNo") Integer certificateNo);

    @Query("SELECT tc FROM TemporaryCertificate tc WHERE tc.ship.imoNo = :imoNo")
    List<TemporaryCertificate> getCertificateByImoNo(@Param("imoNo") Integer imoNo);

    @Query("SELECT tc FROM TemporaryCertificate tc WHERE tc.ship.imoNo = :imoNo AND tc.certificateNumber = :certificateNo")
    TemporaryCertificate getByCertificateNumberAndNumber(@Param("imoNo") Integer imoNo, @Param("certificateNo") Integer certificateNo);
}
