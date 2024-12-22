// src/drizzle/drizzle.module.ts
import { Module } from '@nestjs/common';
import { drizzle } from './drizzle.config';

@Module({
  providers: [
    {
      provide: 'DRIZZLE',
      useValue: drizzle,
    },
  ],
  exports: ['DRIZZLE'],
})
export class DrizzleModule {}