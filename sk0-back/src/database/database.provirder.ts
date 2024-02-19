import { DATA_SOURCE } from "../constants";
import { dataSource } from "../ormconfig";

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      return dataSource.initialize();
    }
  }
];
