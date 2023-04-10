import {TokenWithExtendedStatistics} from "../entities/tokenWithExtendedStatistics";
import {TokenWithBaseStatistics} from "../entities/tokenWithBaseStatistics";
import { PriceStamp } from "../entities/priceStamp";

export class TokenProvider {
  public async findAllByNames(): Promise<TokenWithBaseStatistics[]> {
    try {
      const response = await fetch('http://localhost:3001/api/Token/v1/names', {
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
      const response = await fetch('http://localhost:3001/api/Token/v1/' + address, {
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



  public async findPriceStampsByAddress(address : string): Promise<PriceStamp[]> {
    try {
      const response = await fetch('http://localhost:3001/api/Token/v1/' + address + '/stamps/all', {
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