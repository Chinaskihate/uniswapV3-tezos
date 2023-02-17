##Tezos Uniswap v3 Server Side<br>
###Config:
- ####.env location: 
  <pre>src/app/</pre>
- ####.env description:
  <pre>
  app/src/app.ts:
  ...
  config({path: 'your_env_path'})
  ...
  </pre>
- ####.env pattern: 
  <pre> DB_HOST: {your db host}
   DB_PORT: {your db port} (5432 default to pg)
   DB_USERNAME: {root username}
   DB_PASSWORD: {root password}
   DB_NAME: {name of your db}
  </pre>
- ####db schemas: 
  <pre>src/db/schemas</pre>

### Run
<pre>ts-node src/app/app.ts</pre>

