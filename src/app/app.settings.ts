import { environment } from '../environments/environment';

export class AppSettings {
  public protocol = 'http://'
  public apiIp = this.protocol + environment.location;
  public apiUrl = this.apiIp + '/api/';
}