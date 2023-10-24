import {Controller, Delete, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Delete('/:IP')
  async removeCachedIP(@Param('IP') ip : string ): Promise<boolean> {
    return await this.appService.removeCachedResult(ip);
  }

  /*
  if we do not require to have a possibility to remove cache using out API endpoints
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 1000)
  */
  @Get('/:IP')
  async getIPDescription(@Param('IP') ip : string ): Promise<object> {
    return await this.appService.getIPDescription(ip);
  }
}
