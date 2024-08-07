import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { CelestialPostModule } from './celestial-post/celestial-post.module';
import { AuthModule } from './auth/auth.module';
import { PostLikeModule } from './post-like/post-like.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import * as Validation from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { EventTypesModule } from './event-types/event-types.module';
import { EventSubTypesModule } from './event-sub-types/event-sub-types.module';
import { EventsRatingModule } from './events-rating/events-rating.module';
import { EventFeedbacksModule } from './event-feedbacks/event-feedbacks.module';
import { ContactFormModule } from './contact-form/contact-form.module';
import { SubscriptionFormModule } from './subscription-form/subscription-form.module';
import { DataStatusModule } from './data-status/data-status.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: Validation.object({
        SALT: Validation.string().required(),
        PORT: Validation.number().port().required(),
        // GraphQL
        GRAPHQL_PATH: Validation.string().required(),
        GRAPHQL_PLAYGROUND: Validation.boolean().required(),
        GRAPHQL_DEBUG: Validation.boolean().required(),
        // DB
        POSTGRES_HOST: Validation.string().required(),
        POSTGRES_PORT: Validation.number().port().required(),
        POSTGRES_DB: Validation.string().required(),
        POSTGRES_USERNAME: Validation.string().required(),
        POSTGRES_PASSWORD: Validation.string().required(),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadModels: true,
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      playground: process.env.GRAPHQL_PLAYGROUND == 'true',
      path: process.env.GRAPHQL_PATH,
      driver: ApolloDriver,
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    UserModule,
    CelestialPostModule,
    AuthModule,
    PostLikeModule,
    PostCommentModule,
    EventsModule,
    UserRolesModule,
    EventTypesModule,
    EventSubTypesModule,
    EventsRatingModule,
    EventFeedbacksModule,
    ContactFormModule,
    SubscriptionFormModule,
    DataStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
