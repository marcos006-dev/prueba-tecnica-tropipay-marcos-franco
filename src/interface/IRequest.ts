export interface IRequest {
  sendRequest(url: string): Promise<any>;
}
