import { Injectable, Inject } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {CACHE_MANAGER} from "@nestjs/cache-manager";

@Injectable()
export class AppService {

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager, private readonly httpService: HttpService) {}

  /*
        ToDo: How I understand that`s different actions? Is that correct?
              -Remove cached result by IP
              -Cache should be auto-removed after TTL of 60 seconds, so only the cache result would be updated each 60 seconds for the particular IP address
   */
  async removeCachedResult(ip): Promise<boolean> {
    return await this.cacheManager.del(ip);
  }
  async getIPDescription(ip): Promise<object> {
    const data = await this.cacheManager.get(ip);
    return data ? JSON.parse(data) : await this.httpService.axiosRef.get(`http://ipwho.is/${ip}`)
        .then(({ data }) => {
          console.log('Target IP: ', ip, ' Time of requesting: ', new Date());
          this.cacheManager.set(ip, JSON.stringify(data), 60 * 1000);
          return data
      });
  }
}
