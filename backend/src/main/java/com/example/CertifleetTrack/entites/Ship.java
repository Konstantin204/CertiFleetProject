package com.example.CertifleetTrack.entites;


import jakarta.persistence.*;

import java.time.Year;
import java.util.List;

@Entity
@Table(name = "ships", uniqueConstraints = {@UniqueConstraint(columnNames = "imo_no")})
public class Ship {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "imo_no", unique = true)
    private Integer imoNo;

    @Column(name = "name")
    private String name;
    @Column(name = "port")
    private String port;
    @Column(name = "grt")
    private Integer grt; //gross register tonnage
    @Column(name = "construction_year")
    private Year constructionYear;
    @Column(name = "length")
    private Integer length;
    @Column(name = "insb_no")
    private Integer insbNo;
    @Column(name = "call_sign")
    private String callSign;
    @Column(name = "nrt")
    private Integer nrt; //net register tonnage
    @Column(name = "construction_place")
    private String constructionPlace;
    @Column(name = "width")
    private Integer width;
    @Column(name = "flag")
    private String flag;
    @Column(name = "power_kw")
    private Integer powerKW;
    @Column(name = "factory")
    private String factory;
    @Column(name = "board_height")
    private Integer boardHeight;

    @OneToMany(mappedBy = "ship", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inspection> inspections;
    @OneToMany(mappedBy = "ship", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TemporaryCertificate> temporaryCertificates;

    @OneToMany(mappedBy = "ship", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PermanentCertificate> permanentCertificates;

    public Long getId() {
        return id;
    }

    public Integer getImoNo() {
        return imoNo;
    }

    public List<PermanentCertificate> getPermanentCertificates() {
        return permanentCertificates;
    }

    public void setPermanentCertificates(List<PermanentCertificate> permanentCertificates) {
        this.permanentCertificates = permanentCertificates;
    }

    public List<Inspection> getInspections() {
        return inspections;
    }

    public void setInspections(List<Inspection> inspections) {
        this.inspections = inspections;
    }

    public List<TemporaryCertificate> getTemporaryCertificates() {
        return temporaryCertificates;
    }

    public void setTemporaryCertificates(List<TemporaryCertificate> temporaryCertificates) {
        this.temporaryCertificates = temporaryCertificates;
    }

    public void setImoNo(Integer imoNo) {
        this.imoNo = imoNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public Integer getGrt() {
        return grt;
    }

    public void setGrt(Integer grt) {
        this.grt = grt;
    }

    public Year getConstructionYear() {
        return constructionYear;
    }

    public void setConstructionYear(Year constructionYear) {
        this.constructionYear = constructionYear;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public Integer getInsbNo() {
        return insbNo;
    }

    public void setInsbNo(Integer insbNo) {
        this.insbNo = insbNo;
    }

    public String getCallSign() {
        return callSign;
    }

    public void setCallSign(String callSign) {
        this.callSign = callSign;
    }

    public Integer getNrt() {
        return nrt;
    }

    public void setNrt(Integer nrt) {
        this.nrt = nrt;
    }

    public String getConstructionPlace() {
        return constructionPlace;
    }

    public void setConstructionPlace(String constructionPlace) {
        this.constructionPlace = constructionPlace;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public Integer getPowerKW() {
        return powerKW;
    }

    public void setPowerKW(Integer powerKW) {
        this.powerKW = powerKW;
    }

    public String getFactory() {
        return factory;
    }

    public void setFactory(String factory) {
        this.factory = factory;
    }

    public Integer getBoardHeight() {
        return boardHeight;
    }

    public void setBoardHeight(Integer boardHeight) {
        this.boardHeight = boardHeight;
    }

    public Ship() {

    }
}
