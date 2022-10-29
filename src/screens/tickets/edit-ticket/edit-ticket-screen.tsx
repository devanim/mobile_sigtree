import React from "react";
import EditTicket from "./edit-ticket";

const EditTicketScreen = (props: any): JSX.Element => {
  const ticketDetails = props.route.params;

  return (
    <>
      <EditTicket ticket={ticketDetails}/>
    </>
  );
};

export default EditTicketScreen;