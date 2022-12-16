import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesResolver } from './event-types.resolver';

@Module({
  providers: [EventTypesResolver, EventTypesService]
})
export class EventTypesModule {}
