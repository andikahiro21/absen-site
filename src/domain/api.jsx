import axios from "axios";
import moment from "moment";

export const callAPI = async (endpoint, method, headers, params, data) => {
  const baseURL = "http://localhost:3000/absent";
  const options = {
    baseURL,
    url: endpoint,
    method,
    headers,
    params,
    data,
  };

  const response = await axios(options);
  return response?.data;
};


export async function postDataToServer(data) {
  try {
    // Generate the current time in your specified format
    const checkin = moment().format('YYYY-MM-DDTHH:mm:ss');

    // Update the "checkin" field in the data object
    data.checkin = checkin;

    const response = await axios.post('http://localhost:3000/absent', data);
    console.log('Response from the server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}