import { Controller, Get, Injectable } from "@nestjs/common";
import { Client, ClientProxy, MessagePattern, Payload, Transport } from "@nestjs/microservices";

@Controller()
export class SocketConsumer {


    @MessagePattern('socket_emit')
    emitSocketEvent(@Payload() data: number[]){
        console.log("data is:", data)
    }

}