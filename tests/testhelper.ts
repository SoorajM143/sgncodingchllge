// import { Connection, createConnection } from "typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import {AppDataSource} from '../src/data-source';

import Database from "better-sqlite3";

export class TestHelper {
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;
  private testdb!: any;
  async setupTestDB() {
    this.testdb = new Database(":memory:", { verbose: console.log });

    this.dbConnect = AppDataSource;
    await this.dbConnect.initialize();
  }

  teardownTestDB() {
    this.dbConnect.destroy();
    this.testdb.close();
  }
}