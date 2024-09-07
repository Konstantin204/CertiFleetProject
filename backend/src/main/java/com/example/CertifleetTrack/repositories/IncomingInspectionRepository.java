package com.example.CertifleetTrack.repositories;

import com.example.CertifleetTrack.entites.IncomingInspection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomingInspectionRepository extends JpaRepository<IncomingInspection, Integer> {
}
