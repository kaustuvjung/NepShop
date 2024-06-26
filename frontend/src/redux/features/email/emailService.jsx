import axios from "axios";
import { API_URL } from "../auth/authService";

// send Automated Email
const sendAutomatedEmail = async (emailData) => {
  const response = await axios.post(API_URL + "sendAutomatedEmail", emailData);
  return response.data.message;
};

const emailService = {
  sendAutomatedEmail,
};

export default emailService;