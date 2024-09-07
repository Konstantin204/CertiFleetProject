package com.example.CertifleetTrack.controllers;


import com.example.CertifleetTrack.entites.Inspection;
import com.example.CertifleetTrack.entites.Ship;
import com.example.CertifleetTrack.services.ShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ship")
public class ShipController {

    @Autowired
    private ShipService shipService;

    @GetMapping("/get-ships")
    public List<Ship> getShips() {
        return shipService.getAllShips();
    }

    @PostMapping("/save-ship")
    public Ship saveShip(@RequestBody Ship ship) {return shipService.saveShip(ship);
    }

    @GetMapping("/get-imo-nos")
    public List<Integer> getAllImoNos(){
        return shipService.getAllImoNos();
    }
    @GetMapping("/get-by-imoNo/{imoNo}")
    public Ship getShipByImoNo(@PathVariable Integer imoNo) {
        return shipService.getShipByImoNo(imoNo);
    }

}
