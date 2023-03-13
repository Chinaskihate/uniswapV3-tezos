import axios from "axios";
import {TokenWithExtendedStatistics} from "../entities/tokenWithExtendedStatistics";
import {TokenWithBaseStatistics} from "../entities/tokenWithBaseStatistics";

export class TokenProvider {
  public async findAllByNames(): Promise<TokenWithBaseStatistics[]> {
    try {
      const response = await axios.get<TokenWithBaseStatistics[]>(
        'http://localhost:3000/api/Token/v1/names',
        { headers: { 'Access-Control-Allow-Origin': true }});
      return response.data
    } catch (error) {
      console.error(error);
      return [] as TokenWithBaseStatistics[];
    }
  }

  public async findByAddress(address: string): Promise<TokenWithExtendedStatistics> {
    try {
      const response = await axios.get<TokenWithExtendedStatistics>(
        'http://localhost:3000/api/Token/v1/'+ address,
        { headers: { 'Access-Control-Allow-Origin': true }});
      return response.data
    } catch (error) {
      console.error(error);
      return {} as TokenWithExtendedStatistics
    }
  }
}