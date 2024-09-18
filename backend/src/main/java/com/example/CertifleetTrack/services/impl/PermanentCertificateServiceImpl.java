package com.example.CertifleetTrack.services.impl;

import com.example.CertifleetTrack.entites.IncomingInspection;
import com.example.CertifleetTrack.entites.*;
import com.example.CertifleetTrack.enums.CertificateTypes;
import com.example.CertifleetTrack.enums.IncomingInspectionStatus;
import com.example.CertifleetTrack.enums.InspectionClass;
import com.example.CertifleetTrack.enums.InspectionType;
import com.example.CertifleetTrack.repositories.IncomingInspectionRepository;
import com.example.CertifleetTrack.repositories.InspectionRepository;
import com.example.CertifleetTrack.repositories.PermanentCertificateRepository;
import com.example.CertifleetTrack.repositories.ShipRepository;
import com.example.CertifleetTrack.services.EmailSenderService;
import com.example.CertifleetTrack.services.PermanentCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.function.BiFunction;
import java.util.stream.Collectors;

@Service
public class PermanentCertificateServiceImpl extends CertificateServiceImpl<PermanentCertificate, Long> implements PermanentCertificateService {

    @Autowired
    private ShipRepository shipRepository;
    @Autowired
    private InspectionRepository inspectionRepository;
    @Autowired
    private IncomingInspectionRepository incomingInspectionRepository;
    @Autowired
    private EmailSenderService emailSenderService;

    private final PermanentCertificateRepository permanentCertificateRepository;
    @Autowired
    private InspectionServiceImpl inspectionServiceImpl;

    @Autowired
    public PermanentCertificateServiceImpl(@Qualifier("permanentCertificateRepository") PermanentCertificateRepository permanentCertificateRepository) {
        super(permanentCertificateRepository);
        this.permanentCertificateRepository = permanentCertificateRepository;
    }

    @Override
    public PermanentCertificate getByCertificateNumber(Integer number) {
        return permanentCertificateRepository.getByCertificateNumber(number);
    }

    @Override
    public List<PermanentCertificate> getCertificateByImoNo(Integer imoNo) {
        return permanentCertificateRepository.getCertificateByImoNo(imoNo);
    }

    @Override
    public PermanentCertificate getCertificateByImoNoAndNumber(Integer imoNo, Integer number) {
        return permanentCertificateRepository.getByCertificateNumberAndNumber(imoNo, number);
    }

    @Scheduled(cron = "0 0 * * 1 ?")
    public void manageIncomingInspections() {
        List<Ship> ships = shipRepository.findAll();
        incomingInspectionRepository.deleteAll();
        List<IncomingInspection> inspections = new ArrayList<>();
        for (Ship ship : ships) {
            List<PermanentCertificate> certificates = getCertificateByImoNo(ship.getImoNo()).stream()
                    .filter(certificate -> Objects.equals(certificate.getStatus(), "VALID"))
                    .collect(Collectors.toList());
            for (PermanentCertificate certificate : certificates) {
                CertificateTypes type = certificate.getCertificateType();
                Integer yearCounter = certificate.getYearCounter();
                switch (type) {
                    case CLASS -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.CLASS,
                                        Optional.of(this::getAnnualInspectionForCLASS),
                                        Optional.of(this::getIntermediateOrAnnualForCLASS),
                                        Optional.of(this::getSpecialInspectionForCLASS)));
                    }
                    case SAFETY_CONSTRUCTION -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.SAFETY_CONSTRUCTION,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.of(this::getIntermediateOrAnnual),
                                        Optional.of(this::getSpecialInspection)));

                    }
                    case SAFETY_EQUIPMENT -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.SAFETY_EQUIPMENT,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.empty(), // check periodical case
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case PASSENGER_SHIP_SAFETY -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.PASSENGER_SHIP_SAFETY,
                                        Optional.empty(),
                                        Optional.empty(),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case LOAD_LINE -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.INTERNATIONAL_LOAD_LINE,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.empty(), // check periodical case
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case IOPP -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.INTERNATIONAL_OIL_POLLUTION_PREVENTION,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.of(this::getIntermediateOrAnnual),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case IAPP -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.INTERNATIONAL_AIR_POLLUTION_PREVENTION,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.of(this::getIntermediateOrAnnual),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case SEWAGE -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.INTERNATIONAL_SEWAGE_POLLUTION_PREVENTION,
                                        Optional.empty(),
                                        Optional.empty(),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case GARBAGE -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.INTERNATIONAL_GARBAGE_POLLUTION_PREVENTION,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.empty(),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case BALLAST_WATER_MANAGEMENT -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.INTERNATIONAL_BALLAST_WATER_MANAGEMENT,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.of(this::getIntermediateOrAnnual),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case IHM -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.INTERNATIONAL_BALLAST_WATER_MANAGEMENT,
                                        Optional.empty(),
                                        Optional.empty(),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case REF_PLANT -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.REFRIGERATING_PLANT,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.of(this::getIntermediateOrAnnual),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case CARGO_GEAR -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.CARGO_GEAR,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.empty(),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    // CREW ACCOMODATION
                    case SOLID_BULK_CARGO -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.SOLID_BULK_CARGO,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.empty(),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case DANGEROUS_GOODS -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.DANGEROUS_GOODS,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.empty(),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case ISPS -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.ISPS_VESSEL_AUDIT,
                                        Optional.empty(),
                                        Optional.of(this::getIntermediateOrAnnualVA),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case MLC -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.MLC_VESSEL_AUDIT,
                                        Optional.empty(),
                                        Optional.of(this::getIntermediateOrAnnualVA),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case SAFETY_EQUIPMENT_INSPECTION -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.SAFETY_EQUIPMENT,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.of(this::getAnnualInspection),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case SAFETY_RADIO -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.SAFETY_RADIO,
                                        Optional.empty(),
                                        Optional.of(this::getAnnualInspection),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case ISM -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.ISM_VESSEL_AUDIT,
                                        Optional.empty(),
                                        Optional.of(this::getIntermediateOrAnnualVA),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    case DOC -> {
                        inspections.addAll(
                                manageInspections(
                                        yearCounter,
                                        certificate,
                                        InspectionClass.ISM_COMPANY_AUDIT,
                                        Optional.of(this::getAnnualInspection),
                                        Optional.empty(),
                                        Optional.of(this::getSpecialInspection)));
                    }
                    default -> {
                    }
                }
            }
        }
        Set<Integer> certificateNumbers = inspections.stream()
                .filter(inspection -> inspection.getStatus() != IncomingInspectionStatus.GOOD) // Filter based on status
                .map(inspection -> inspection.getCertificate().getCertificateNumber())
                .collect(Collectors.toSet());
        this.emailSenderService.sendSimpleMessage("kocaa.dd@abv.bg", "Сертификати за проверка: ", "Проверете сертификати с номера: " + certificateNumbers  );
        incomingInspectionRepository.saveAll(inspections);
    }


    private List<IncomingInspection> manageInspections(
            Integer yearCounter,
            PermanentCertificate certificate,
            InspectionClass inspectionClass,
            Optional<BiFunction<PermanentCertificate, InspectionClass, List<IncomingInspection>>> func1,
            Optional<BiFunction<PermanentCertificate, InspectionClass, List<IncomingInspection>>> func2,
            Optional<BiFunction<PermanentCertificate, InspectionClass, List<IncomingInspection>>> func3) {
        switch (yearCounter) {
            case 0, 1, 3 -> {
                return func1.orElse((cert, inspectionTypes) -> Collections.emptyList()).apply(certificate, inspectionClass);
            }
            case 2 -> {
                return func2.orElse((cert, inspectionTypes) -> Collections.emptyList()).apply(certificate, inspectionClass);
            }
            case 4 -> {
                return func3.orElse((cert, inspectionTypes) -> Collections.emptyList()).apply(certificate, inspectionClass);
            }
            default -> {
                return Collections.emptyList();
            }
        }
    }

    private List<IncomingInspection> getAnnualInspectionForCLASS(PermanentCertificate certificate, InspectionClass inspectionClass) {
        LocalDate inspectionDate = certificate.getInspectionDate();
        LocalDate today = LocalDate.now();
        LocalDate periodStart = inspectionDate.minus(3, ChronoUnit.MONTHS);
        LocalDate periodEnd = inspectionDate.plus(3, ChronoUnit.MONTHS);
        List<IncomingInspection> inspections = new ArrayList<>();
        if ((today.isEqual(periodStart) || today.isAfter(periodStart)) &&
                (today.isEqual(periodEnd) || today.isBefore(periodEnd))) {
            IncomingInspectionStatus status = checkIncomingInspectionStatus(inspectionDate, today);
            inspections.add(new IncomingInspection(InspectionClass.CLASS, InspectionType.ANNUAL, status, certificate));
            inspections.add(new IncomingInspection(InspectionClass.BOILER, InspectionType.ANNUAL, status, certificate));
            inspections.add(new IncomingInspection(InspectionClass.UNATTENDED_MACHINERY_SPACE, InspectionType.ANNUAL, status, certificate));
        }
        return inspections;
    }

    private List<IncomingInspection> getSpecialInspectionForCLASS(PermanentCertificate certificate, InspectionClass inspectionClass) {
        List<IncomingInspection> inspections = new ArrayList<>();
        LocalDate inspectionDate = certificate.getValidTo();
        LocalDate today = LocalDate.now();
        LocalDate periodStart = inspectionDate.minus(3, ChronoUnit.MONTHS);
        LocalDate periodEnd = inspectionDate;

        if ((today.isEqual(periodStart) || today.isAfter(periodStart)) &&
                (today.isEqual(periodEnd) || today.isBefore(periodEnd))) {
            IncomingInspectionStatus status = checkIncomingInspectionStatusForSpecial(inspectionDate, today);
            inspections.add(new IncomingInspection(InspectionClass.CLASS, InspectionType.SPECIAL, status, certificate));
            inspections.add(new IncomingInspection(InspectionClass.BOILER, InspectionType.SPECIAL, status, certificate));
            inspections.add(new IncomingInspection(InspectionClass.UNATTENDED_MACHINERY_SPACE, InspectionType.SPECIAL, status, certificate));
            inspections.add(new IncomingInspection(InspectionClass.TAIL_SHAFT, status, certificate));
            inspections.add(new IncomingInspection(InspectionClass.DRY_DOCK, status, certificate));
        }
        return inspections;
    }

    private List<IncomingInspection> getIntermediateOrAnnualForCLASS(PermanentCertificate certificate, InspectionClass inspectionClass) {
        List<IncomingInspection> inspections = new ArrayList<>();
        List<Inspection> inspectionsFromDB = this.inspectionRepository.getInspectionByImoNo(certificate.getShip().getImoNo());
        LocalDate inspectionDate = certificate.getInspectionDate();
        LocalDate today = LocalDate.now();
        LocalDate periodStartClass = inspectionDate.minus(3, ChronoUnit.MONTHS);
        LocalDate periodEndClass = inspectionDate.plus(3, ChronoUnit.MONTHS);
        IncomingInspectionStatus status = checkIncomingInspectionStatus(inspectionDate, today);        if ((today.isEqual(periodStartClass) || today.isAfter(periodStartClass)) &&
                (today.isEqual(periodEndClass) || today.isBefore(periodEndClass))) {
            Boolean isIntermediate = inspectionsFromDB.stream().anyMatch(it -> it.getIsIntermediate());
            InspectionType type;
            if (isIntermediate) {
                type = InspectionType.INTERMEDIATE;
            } else {
                type = InspectionType.ANNUAL;
            }
            inspections.add(new IncomingInspection(InspectionClass.CLASS, type, status, certificate));
            inspections.add(new IncomingInspection(InspectionClass.BOILER, type, status, certificate));
            inspections.add(new IncomingInspection(InspectionClass.UNATTENDED_MACHINERY_SPACE, type, status, certificate));
        }

        LocalDate periodStartDD = inspectionDate.minus(2, ChronoUnit.YEARS).minus(6, ChronoUnit.MONTHS);
        LocalDate periodEndDD = inspectionDate.plus(2, ChronoUnit.YEARS);
        if ((today.isEqual(periodStartDD) || today.isAfter(periodStartDD)) &&
                (today.isEqual(periodEndDD) || today.isBefore(periodEndDD))) {

            Boolean betweenDwoDocks = inspectionsFromDB.stream()
                    .anyMatch(it -> it.getAdditionalInfo().stream()
                            .anyMatch(additionalInfo -> additionalInfo.getInspectionType() == InspectionType.BETWEEN_TWO_DD));

            if (!betweenDwoDocks) {
                inspections.add(new IncomingInspection(InspectionClass.DRY_DOCK, status, certificate));
            }
        }
        return inspections;
    }

    private List<IncomingInspection> getAnnualInspection(PermanentCertificate certificate, InspectionClass inspectionClass) {
        List<IncomingInspection> inspections = new ArrayList<>();
        LocalDate inspectionDate = certificate.getInspectionDate();
        LocalDate today = LocalDate.now();
        LocalDate periodStart = inspectionDate.minus(3, ChronoUnit.MONTHS);
        LocalDate periodEnd = inspectionDate.plus(3, ChronoUnit.MONTHS);
        if ((today.isEqual(periodStart) || today.isAfter(periodStart)) &&
                (today.isEqual(periodEnd) || today.isBefore(periodEnd))) {
            IncomingInspectionStatus status = checkIncomingInspectionStatus(inspectionDate, today);
            inspections.add(new IncomingInspection(inspectionClass, InspectionType.ANNUAL, status, certificate));
        }
        return inspections;
    }

    private List<IncomingInspection> getSpecialInspection(PermanentCertificate certificate, InspectionClass inspectionClass) {
        List<IncomingInspection> inspections = new ArrayList<>();
        LocalDate inspectionDate = certificate.getValidTo();
        LocalDate today = LocalDate.now();
        LocalDate periodStart = inspectionDate.minus(3, ChronoUnit.MONTHS);
        LocalDate periodEnd = inspectionDate;

        if ((today.isEqual(periodStart) || today.isAfter(periodStart)) &&
                (today.isEqual(periodEnd) || today.isBefore(periodEnd))) {
            IncomingInspectionStatus status = checkIncomingInspectionStatus(inspectionDate, today);
            inspections.add(new IncomingInspection(inspectionClass, InspectionType.RENEWABLE, status, certificate));
        }
        return inspections;
    }

    private List<IncomingInspection> getIntermediateOrAnnual(PermanentCertificate certificate, InspectionClass inspectionClass) {
        List<IncomingInspection> inspections = new ArrayList<>();
        List<Inspection> inspectionsFromDB = this.inspectionRepository.getInspectionByImoNo(certificate.getShip().getImoNo());
        LocalDate inspectionDate = certificate.getInspectionDate();
        LocalDate today = LocalDate.now();
        LocalDate periodStart = inspectionDate.minus(3, ChronoUnit.MONTHS);
        LocalDate periodEnd = inspectionDate.plus(3, ChronoUnit.MONTHS);
        if ((today.isEqual(periodStart) || today.isAfter(periodStart)) &&
                (today.isEqual(periodEnd) || today.isBefore(periodEnd))) {
            Boolean isIntermediate = inspectionsFromDB.stream().anyMatch(it -> it.getIsIntermediate());
            InspectionType type;
            if (isIntermediate) {
                type = InspectionType.INTERMEDIATE;
            } else {
                type = InspectionType.ANNUAL;
            }
            IncomingInspectionStatus status = checkIncomingInspectionStatus(inspectionDate, today);
            inspections.add(new IncomingInspection(inspectionClass, type, status, certificate));
        }

        return inspections;
    }

    private List<IncomingInspection> getIntermediateOrAnnualVA(PermanentCertificate certificate, InspectionClass inspectionClass) {
        List<IncomingInspection> inspections = new ArrayList<>();
        List<Inspection> inspectionsFromDB = this.inspectionRepository.getInspectionByImoNo(certificate.getShip().getImoNo());
        LocalDate inspectionDate = certificate.getValidTo();
        LocalDate today = LocalDate.now();
        LocalDate periodStart = inspectionDate.minus(36, ChronoUnit.MONTHS);
        LocalDate periodEnd = inspectionDate.minus(24, ChronoUnit.MONTHS);
        if ((today.isEqual(periodStart) || today.isAfter(periodStart)) &&
                (today.isEqual(periodEnd) || today.isBefore(periodEnd))) {
            Boolean isIntermediate = inspectionsFromDB.stream().anyMatch(it -> it.getIsIntermediate());
            InspectionType type;
            IncomingInspectionStatus status = checkIncomingInspectionStatus(inspectionDate, today);
            if (isIntermediate) {
                type = InspectionType.INTERMEDIATE;
            } else {
                type = InspectionType.ANNUAL;
            }
            inspections.add(new IncomingInspection(inspectionClass, type, status, certificate));
        }

        return inspections;
    }

    private IncomingInspectionStatus checkIncomingInspectionStatus(LocalDate inspectionDate, LocalDate today) {
        if (today.isAfter(inspectionDate.minus(3, ChronoUnit.MONTHS)) && today.isBefore(inspectionDate)) {
            return IncomingInspectionStatus.GOOD;
        } else if (today.isEqual(inspectionDate) || (today.isAfter(inspectionDate) && today.isBefore(inspectionDate.plus(2, ChronoUnit.MONTHS)))) {
            return IncomingInspectionStatus.WARNING;
        } else if (today.isEqual(inspectionDate.plus(2, ChronoUnit.MONTHS)) || (today.isAfter(inspectionDate.plus(2, ChronoUnit.MONTHS)) && today.isBefore(inspectionDate.plus(3, ChronoUnit.MONTHS)))) {
            return IncomingInspectionStatus.CRITICAL;
        }
        return IncomingInspectionStatus.GOOD;
    }

    private IncomingInspectionStatus checkIncomingInspectionStatusForSpecial(LocalDate validTo, LocalDate today) {
        LocalDate threeMonthsBefore = validTo.minus(3, ChronoUnit.MONTHS);
        LocalDate twoMonthsBefore = validTo.minus(2, ChronoUnit.MONTHS);
        LocalDate oneMonthBefore = validTo.minus(1, ChronoUnit.MONTHS);

        if (today.isAfter(threeMonthsBefore) && today.isBefore(twoMonthsBefore)) {
            return IncomingInspectionStatus.GOOD;
        }
        if (today.isAfter(twoMonthsBefore) && today.isBefore(oneMonthBefore)) {
            return IncomingInspectionStatus.WARNING;
        }
        if (today.isAfter(oneMonthBefore) && !today.isAfter(validTo)) {
            return IncomingInspectionStatus.CRITICAL;
        }
        return IncomingInspectionStatus.GOOD;
    }



    ///new Object not in the database just object -> map of certificate to inspections

}
