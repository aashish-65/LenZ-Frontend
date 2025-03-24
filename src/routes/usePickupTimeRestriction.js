// usePickupTimeRestriction.js
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isServiceUnavailable } from "../utils/serviceAvailability";
const usePickupTimeRestriction = () => {
  const navigate = useNavigate();

  const handleBookForPickup = () => {
    const isBlocked = isServiceUnavailable();
    if (isBlocked) {
      toast.error("Service not available. It will restart at 10 AM IST.");
      return;
    }

    navigate("/pickup-orders");
  };

  return handleBookForPickup;
};

export default usePickupTimeRestriction;
