import axios from "axios";
import { IRequest } from "../interface/IRequest";

/**
 * Service for sending HTTP requests.
 */
export class RequestService implements IRequest {
  async sendRequest(url: string): Promise<any> {
    return await axios.get(url);
  }
}
