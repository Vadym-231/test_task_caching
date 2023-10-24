import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {CacheInterceptor, CacheModule} from '@nestjs/cache-manager';
import { AppService } from './app.service';
import {HttpModule} from "@nestjs/axios";
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
  imports: [CacheModule.register({ isGlobal: true }), HttpModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }],
})
export class AppModule {}
