package com.example.CertifleetTrack.repositories;


import com.example.CertifleetTrack.entites.Ship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipRepository extends JpaRepository<Ship, Integer> {

    @Query("SELECT s from Ship s join fetch s.inspections")
    List<Ship> findAll();

    Ship findShipByImoNo(Integer imoNo);

    @Query("SELECT s.imoNo from Ship s")
    List<Integer> getAllImoNos();
}
