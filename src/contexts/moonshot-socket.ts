import {io} from "socket.io-client";
import {createContext} from "react";

export const socket = io("http://34.146.175.16/");
export const MoonshotSocketContext = createContext(socket);
