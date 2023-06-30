import { Controller, Get, Post, Body  } from '@nestjs/common';
import { AppService } from './app.service';
import { map } from 'rxjs';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  

}
