package com.example.CertifleetTrack.entites;

import com.example.CertifleetTrack.enums.IncomingInspectionStatus;
import com.example.CertifleetTrack.enums.InspectionClass;
import com.example.CertifleetTrack.enums.InspectionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class IncomingInspection {

    public Long getId() {
        return id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "inspection-class")
    private InspectionClass inspectionClass;

    @Enumerated(EnumType.STRING)
    @Column(name = "inspection-type")
    private InspectionType inspectionType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private IncomingInspectionStatus status;

    @ManyToOne
    @JoinColumn(name = "certificate", referencedColumnName = "id")
    @JsonIgnore
    private PermanentCertificate certificate;


    public InspectionClass getInspectionClass() {
        return inspectionClass;
    }

    public void setInspectionClass(InspectionClass inspectionClass) {
        this.inspectionClass = inspectionClass;
    }

    public InspectionType getInspectionType() {
        return inspectionType;
    }

    public void setInspectionType(InspectionType inspectionType) {
        this.inspectionType = inspectionType;
    }

    public IncomingInspectionStatus getStatus() {
        return status;
    }

    public void setStatus(IncomingInspectionStatus status) {
        this.status = status;
    }

    public PermanentCertificate getCertificate() {
        return certificate;
    }

    public void setCertificate(PermanentCertificate certificate) {
        this.certificate = certificate;
    }

    public IncomingInspection(InspectionClass inspectionClass, InspectionType inspectionType, IncomingInspectionStatus status, PermanentCertificate certificate) {
        this.inspectionClass = inspectionClass;
        this.inspectionType = inspectionType;
        this.status = status;
        this.certificate = certificate;
    }

    public IncomingInspection(InspectionClass inspectionClass, IncomingInspectionStatus status, PermanentCertificate certificate) {
        this.inspectionClass = inspectionClass;
        this.status = status;
        this.certificate = certificate;
    }

    public IncomingInspection(){

    }
}
