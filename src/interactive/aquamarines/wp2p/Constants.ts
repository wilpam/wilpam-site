import { JsonTemplate, JsonType, WDGameDef } from "@wilpam/wp2p/WD";

export const aqGame = new WDGameDef("digi:aquamarines", new JsonTemplate({"username": JsonType.String}));
export const aqURL = "wss://ws.wilp.am"