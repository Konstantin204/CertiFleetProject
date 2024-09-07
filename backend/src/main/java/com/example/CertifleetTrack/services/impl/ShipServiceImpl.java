package com.example.CertifleetTrack.services.impl;


import com.example.CertifleetTrack.entites.Ship;
import com.example.CertifleetTrack.repositories.ShipRepository;
import com.example.CertifleetTrack.services.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ShipServiceImpl implements ShipService {


    @Autowired
    private ShipRepository shipRepository;

    @Override
    public List<Ship> getAllShips() {
        return shipRepository.findAll();
    }

    @Override
    public Ship saveShip(Ship ship) {
        return shipRepository.save(ship);
    }

    @Override
    public List<Integer> getAllImoNos(){ return shipRepository.getAllImoNos(); }

    @Override
    public Ship getShipByImoNo(Integer imoNo) {return shipRepository.findShipByImoNo(imoNo);}
}
