package com.example.CertifleetTrack.repositories;

import com.example.CertifleetTrack.entites.Inspection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InspectionRepository extends JpaRepository<Inspection, Integer> {

    @Query("SELECT i FROM Inspection i JOIN FETCH i.additionalInfo WHERE i.ship.imoNo = :imoNo")
    List<Inspection> getInspectionByImoNo(Integer imoNo);

    @Query("SELECT i FROM Inspection i WHERE i.ship.imoNo = :imoNo AND i.startingDate = :startingDate")
    Inspection getInspectionByImoNoAndStartingDate(@Param("imoNo") Integer imoNo, @Param("startingDate") LocalDate startingDate);
}
