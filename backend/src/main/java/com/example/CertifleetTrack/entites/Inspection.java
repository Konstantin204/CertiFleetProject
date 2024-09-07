package com.example.CertifleetTrack.entites;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "inspections")
public class Inspection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "imo_no", referencedColumnName = "imo_no")
    @JsonIgnore
    private Ship ship;

    @Column(name = "inspector")
    private String inspector;
    @Column(name = "place")
    private String place;
    @Column(name = "is_intermediate")
    private Boolean isIntermediate;
    @Column(name ="status")
    private String status;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "additional_documents", joinColumns = @JoinColumn(name = "document_id"))
    @Column(name = "document")
    private List<String> additionalDocuments;

    @Column(name = "sending_date")
    private String sendingDate;

    @Column(name = "instruction_no")
    private Integer instructionNo;

    @Column(name = "starting_date")
    private LocalDate startingDate;

    @Column(name = "ending_date")
    private LocalDate endingDate;

    @OneToMany(mappedBy = "inspection", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InspectionAdditionalInfo> additionalInfo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ship getShip() {
        return ship;
    }

    public void setShip(Ship ship) {
        this.ship = ship;
    }

    public String getInspector() {
        return inspector;
    }

    public void setInspector(String inspector) {
        this.inspector = inspector;
    }

    public String getPlace() {
        return place;
    }

    public List<InspectionAdditionalInfo> getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(List<InspectionAdditionalInfo> additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSendingDate() {
        return sendingDate;
    }

    public void setSendingDate(String sendingDate) {
        this.sendingDate = sendingDate;
    }

    public List<String> getAdditionalDocuments() {
        return additionalDocuments;
    }

    public void setAdditionalDocuments(List<String> additionalDocuments) {
        this.additionalDocuments = additionalDocuments;
    }

    public Integer getInstructionNo() {
        return instructionNo;
    }

    public void setInstructionNo(Integer instructionNo) {
        this.instructionNo = instructionNo;
    }
    public LocalDate getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(LocalDate startingDate) {
        this.startingDate = startingDate;
    }

    public LocalDate getEndingDate() {
        return endingDate;
    }

    public void setEndingDate(LocalDate endingDate) {
        this.endingDate = endingDate;
    }

    public Boolean getIsIntermediate() {
        return isIntermediate;
    }

    public void setIsIntermediate(Boolean intermediate) {
        isIntermediate = intermediate;
    }
}
