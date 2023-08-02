import { ticketModel } from "../mongoose/ticket.model.js";

class TicketModel{

    async createTicket(ticketData) {
        try {
            const ticket = await ticketModel.create(ticketData);
            return ticket;
        } catch (err) {
            throw err;
        }
    }
}

export const ticketsModel = new TicketModel();