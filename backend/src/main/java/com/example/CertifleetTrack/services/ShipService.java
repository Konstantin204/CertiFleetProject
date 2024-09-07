package com.example.CertifleetTrack.services;


import com.example.CertifleetTrack.entites.Ship;

import java.util.List;


public interface ShipService{
     List<Ship> getAllShips();
     Ship saveShip(Ship ship);
     List<Integer> getAllImoNos();
     Ship getShipByImoNo(Integer imoNo);
}
