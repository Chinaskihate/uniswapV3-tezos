import {TokenWithExtendedStatistics} from "../entities/tokenWithExtendedStatistics";
import {TokenWithBaseStatistics} from "../entities/tokenWithBaseStatistics";
import { PriceStamp } from "../entities/priceStamp";


const port = process.env.REACT_APP_SERVER_PORT!
const address = process.env.REACT_APP_SERVER_ADDRESS!

export class TokenProvider {
  public async findAllByNames(): Promise<TokenWithBaseStatistics[]> {
    try {
      const response = await fetch(address + ":" + port + '/api/Token/v1/names', {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      const data = await response.json() as TokenWithBaseStatistics[];
      const ret =  Array.isArray(data) ? data : [];
      console.log("Provider data type: " + typeof ret);
      console.log("Provider data: " + ret);
      return ret;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async findAllByNamesFilter(filter: string): Promise<TokenWithBaseStatistics[]> {
    try {
      const response = await fetch(address + ":" + port + '/api/Token/v1/names/' + filter, {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      const data = await response.json() as TokenWithBaseStatistics[];
      const ret =  Array.isArray(data) ? data : [];
      console.log("Provider data type: " + typeof ret);
      console.log("Provider data: " + ret);
      return ret;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async findByAddress(address: string): Promise<TokenWithExtendedStatistics> {
    try {
      const response = await fetch(address + ":" + port + '/api/Token/v1/' + address, {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      const data = await response.json() as TokenWithExtendedStatistics;
      console.log("price change: " + data.statistics.changeForDay)
      return data
    } catch (error) {
      console.error(error);
      return {} as TokenWithExtendedStatistics;
    }
  }



  public async findPriceStampsByAddress(address : string, period : string): Promise<PriceStamp[]> {
    try {
      const response = await fetch(address + ":" + port + '/api/Token/v1/' + address + '/stamps/' + period, {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      const data = await response.json() as PriceStamp[];
      const ret =  Array.isArray(data) ? data : [];
      console.log("Provider data type: " + typeof ret);
      console.log("Provider data: " + ret);
      return ret;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}