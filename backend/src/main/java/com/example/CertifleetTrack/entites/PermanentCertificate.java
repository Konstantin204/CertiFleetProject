package com.example.CertifleetTrack.entites;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "permanent-certificates")
public class PermanentCertificate extends Certificate {

    @Column(name = "year_counter")
    Integer yearCounter = 0;

    @OneToMany(mappedBy = "certificate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IncomingInspection> incomingInspections;

    public List<IncomingInspection> getIncomingInspections() {
        return incomingInspections;
    }

    public void setIncomingInspections(List<IncomingInspection> incomingInspections) {
        this.incomingInspections = incomingInspections;
    }

    public Integer getYearCounter() {
        return yearCounter;
    }

    public void setYearCounter(Integer yearCounter) {
        this.yearCounter = yearCounter;
    }
}
