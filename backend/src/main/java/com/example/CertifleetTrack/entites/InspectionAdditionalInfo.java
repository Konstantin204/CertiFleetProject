package com.example.CertifleetTrack.entites;

import com.example.CertifleetTrack.enums.InspectionClass;
import com.example.CertifleetTrack.enums.InspectionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class InspectionAdditionalInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "document_number")
    private Integer documentNo;

    @Column(name = "certificate_number")
    private Integer certificateNo;

    @Column(name = "state")
    private String state;

    @Enumerated(EnumType.STRING)
    @Column(name = "inspection_class")
    private InspectionClass inspectionClass;

    @Enumerated(EnumType.STRING)
    @Column(name = "inspection_type")
    private InspectionType inspectionType;

    @ManyToOne
    @JoinColumn(name = "inspection", referencedColumnName = "id")
    @JsonIgnore
    private Inspection inspection;

    public Long getId() { return id; }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    public InspectionClass getInspectionClass() {
        return inspectionClass;
    }

    public Integer getDocumentNo() {
        return documentNo;
    }

    public void setDocumentNo(Integer documentNo) {
        this.documentNo = documentNo;
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

    public Integer getCertificateNo() {
        return certificateNo;
    }

    public void setCertificateNo(Integer certificateNo) {
        this.certificateNo = certificateNo;
    }

    public Inspection getInspection() {
        return inspection;
    }

    public void setInspection(Inspection inspection) {
        this.inspection = inspection;
    }

}
