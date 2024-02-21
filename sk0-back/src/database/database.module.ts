import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.provirder";

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule {}
