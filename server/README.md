## Tezos Uniswap v3 Server Side<br>
### Config
- #### .env location: 
  <pre>src/app/</pre>
- #### .env description:
  <pre>
  app/src/app.ts:
  ...
  config({path: 'your_env_path'})
  ...
  </pre>
- #### .env pattern: 
  <pre> DB_HOST: {your db host}
   DB_PORT: {your db port} (5432 default to pg)
   DB_USERNAME: {root username}
   DB_PASSWORD: {root password}
   DB_NAME: {name of your db}
  </pre>
- #### db schemas: 
  <pre>src/db/schemas</pre>

### Run
<pre>ts-node src/app/app.ts</pre>

### API
- #### GET api/Token/v1/names
  - <b>Description:</b> Returns all available tokens
  - <b>Path params:</b> -
  - <b>Roles</b>: all
  - <b>Response JSON:</b>   <pre> 
[
&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;"address": string,
&nbsp;&nbsp;&nbsp;&nbsp;"fullName": string,
&nbsp;&nbsp;&nbsp;&nbsp;"shortName": string,
&nbsp;&nbsp;&nbsp;&nbsp;"statistics": {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": double,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"change": double
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;}
]</pre>
  - <b>Response codes</b>: 200 | 500
- #### GET api/Token/v1/names/{tokenNamePattern}
  - <b>Description:</b> Returns short info about all available tokens, matching by name with given pattern
  - <b>Path params:</b>
    - tokenNamePattern (string): pattern to match
  - <b>Roles</b>: all
  - <b>Response JSON:</b>   <pre>
[
&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;"address": string,
&nbsp;&nbsp;&nbsp;&nbsp;"fullName": string,
&nbsp;&nbsp;&nbsp;&nbsp;"shortName": string,
&nbsp;&nbsp;&nbsp;&nbsp;"statistics": {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": double,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"change": double
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;}
]</pre>
  - <b>Response codes</b>: 200 | 400 | 404 | 500
- #### GET api/Token/v1/{tokenAddress}
  - <b>Description:</b> Returns full info (including price stamps for all the time) about the token with the given address
  - <b>Path params:</b>
    - tokenAddress (string): address of the token
  - <b>Roles</b>: all
  - <b>Response JSON:</b>   <pre> 
{
&nbsp;&nbsp;"address": string,
&nbsp;&nbsp;"fullName": string,
&nbsp;&nbsp;"shortName": string,
&nbsp;&nbsp;"statistics": {
&nbsp;&nbsp;&nbsp;&nbsp;"price": double,
&nbsp;&nbsp;&nbsp;&nbsp;"change": double,
&nbsp;&nbsp;&nbsp;&nbsp;"totalValueLocked": double,
&nbsp;&nbsp;&nbsp;&nbsp;"totalVolume": double,
&nbsp;&nbsp;&nbsp;&nbsp;"volumeForDay": double,
&nbsp;&nbsp;&nbsp;&nbsp;"icon": string
&nbsp;&nbsp;},
&nbsp;&nbsp;"priceStampsAllTime": [
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": double,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"timeStamp": Date
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;]
}</pre>
  - <b>Response codes</b>: 200 | 400 | 404 | 500
- #### GET api/Token/v1/{tokenAddress}/stamps/{unitOfTime}
  - <b>Description:</b> Returns all price stamps related with given token in the given time
  - <b>Path params:</b>
    - tokenAddress (string): address of the token
    - unitOfTime (enum): 'hour' | 'day' | 'week' | 'year' | 'all' - time interval
  - <b>Roles</b>: all
  - <b>Response JSON:</b> <pre> 
[
&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;"price": double,
&nbsp;&nbsp;&nbsp;&nbsp;"timeStamp": Date
&nbsp;&nbsp;}
]</pre>
  - <b>Response codes</b>: 200 | 400 | 404 | 500
- #### PUT api/Token/v1/add
    - <b>Description:</b> adds given token to the system
    - <b>Body param entity:</b> <pre> 
{
&nbsp;&nbsp;"address": string,
&nbsp;&nbsp;"fullName": string,
&nbsp;&nbsp;"shortName": string,
&nbsp;&nbsp;"statistics": {
&nbsp;&nbsp;&nbsp;&nbsp;"price": double,
&nbsp;&nbsp;&nbsp;&nbsp;"change": double,
&nbsp;&nbsp;&nbsp;&nbsp;"totalValueLocked": double,
&nbsp;&nbsp;&nbsp;&nbsp;"totalVolume": double,
&nbsp;&nbsp;&nbsp;&nbsp;"volumeForDay": double,
&nbsp;&nbsp;&nbsp;&nbsp;"icon": string
&nbsp;&nbsp;},
&nbsp;&nbsp;"priceStampsAllTime": [
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": double,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"timeStamp": Date
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;]
}</pre>
    - <b>Roles</b>: admin
    - <b>Response codes</b>: 201 | 400 | 403 | 500
- #### PATCH api/Token/v1/update
    - <b>Description:</b> update given token
    - <b>Body param entity:</b> <pre> 
{
&nbsp;&nbsp;"address": string,
&nbsp;&nbsp;"fullName": string,
&nbsp;&nbsp;"shortName": string,
&nbsp;&nbsp;"statistics": {
&nbsp;&nbsp;&nbsp;&nbsp;"price": double,
&nbsp;&nbsp;&nbsp;&nbsp;"change": double,
&nbsp;&nbsp;&nbsp;&nbsp;"totalValueLocked": double,
&nbsp;&nbsp;&nbsp;&nbsp;"totalVolume": double,
&nbsp;&nbsp;&nbsp;&nbsp;"volumeForDay": double,
&nbsp;&nbsp;&nbsp;&nbsp;"icon": string
&nbsp;&nbsp;},
&nbsp;&nbsp;"priceStampsAllTime": [
&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"price": double,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"timeStamp": Date
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;]
}</pre>
    - <b>Roles</b>: admin
    - <b>Response codes</b>: 200 | 403 | 404 | 500
- #### DELETE api/Token/v1/delete/{tokenAddress}
    - <b>Description:</b> removes token from the system by token address
    - <b>Path params:</b>
      - tokenAddress (string): address of the token
    - <b>Roles</b>: admin
    - <b>Response codes</b>: 200 | 403 | 404 | 500

