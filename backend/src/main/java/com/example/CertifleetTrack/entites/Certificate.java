package com.example.CertifleetTrack.entites;


import com.example.CertifleetTrack.enums.CertificateTypes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@MappedSuperclass
public abstract class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "imo_no", referencedColumnName = "imo_no")
    @JsonIgnore
    private Ship ship;
    @Enumerated(EnumType.STRING)
    @Column(name = "class")
    private CertificateTypes certificateType;
    @Column(name = "certificate_number", unique = true)
    private Integer certificateNumber;
    @Column(name = "issued_by")
    private String issuedBy;
    @Column(name = "issued_in")
    private String issuedIn;
    @Column(name = "issued_on")
    private LocalDate issuedOn;
    @Column(name = "valid_till")
    private LocalDate validTo;
    @Column(name = "inspection_date")
    private LocalDate inspectionDate;
    @Column(name = "status")
    private String status;
    @Column(name = "reason")
    private String reason;

    public Long getId() {
        return id;
    }

    public Ship getShip() {
        return ship;
    }

    public void setShip(Ship ship) {
        this.ship = ship;
    }

    public CertificateTypes getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(CertificateTypes certificateClass) {
        this.certificateType = certificateClass;
    }

    public Integer getCertificateNumber() {
        return certificateNumber;
    }

    public void setCertificateNumber(Integer certificateNumber) {
        this.certificateNumber = certificateNumber;
    }

    public String getIssuedBy() {
        return issuedBy;
    }

    public void setIssuedBy(String issuedBy) {
        this.issuedBy = issuedBy;
    }

    public String getIssuedIn() {
        return issuedIn;
    }

    public void setIssuedIn(String issuedIn) {
        this.issuedIn = issuedIn;
    }

    public LocalDate getIssuedOn() {
        return issuedOn;
    }

    public void setIssuedOn(LocalDate issuedOn) {
        this.issuedOn = issuedOn;
    }

    public LocalDate getValidTo() {
        return validTo;
    }

    public void setValidTo(LocalDate validTo) {
        this.validTo = validTo;
    }

    public LocalDate getInspectionDate() {
        return inspectionDate;
    }

    public void setInspectionDate(LocalDate inspectionDate) {
        this.inspectionDate = inspectionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
