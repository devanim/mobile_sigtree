import React from "react";
import { NavigationType } from "../../../models/dashboard/navigation-enum";
import BottomNavigation from "../../../components/bottom-navigation";

import EditTicket from "./edit-ticket";

const EditTicketScreen = (props: any): JSX.Element => {
  const ticketDetails = props.route.params;

  return (
    <>
      <EditTicket ticket={ticketDetails} />
      <BottomNavigation type={NavigationType.TICKETS}/>
    </>
  );
};

export default EditTicketScreen;