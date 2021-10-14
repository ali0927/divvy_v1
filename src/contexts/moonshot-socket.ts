import {io} from "socket.io-client";
import {createContext} from "react";

export const socket = io("https://34.107.147.11/");
export const MoonshotSocketContext = createContext(socket);
