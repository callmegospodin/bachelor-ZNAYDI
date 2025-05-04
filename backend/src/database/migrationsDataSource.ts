import { DataSource } from 'typeorm';

import { getDataSourceConfig } from './orm.config';

export const dataSource: DataSource = new DataSource(getDataSourceConfig());
