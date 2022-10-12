import { Payload } from "../payload";
import Statistics from "./statistics";

export default class StatisticsPayload extends Payload {
  declare public data: TicketStatistics; 
}

type TicketStatistics = {
  tickets: Statistics;
}