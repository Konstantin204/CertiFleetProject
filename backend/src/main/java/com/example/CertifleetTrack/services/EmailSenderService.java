package com.example.CertifleetTrack.services;

public interface EmailSenderService {
    void sendSimpleMessage(String to, String subject, String text);
}
