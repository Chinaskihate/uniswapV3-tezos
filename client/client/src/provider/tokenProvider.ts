import {TokenWithExtendedStatistics} from "../entities/tokenWithExtendedStatistics";
import {TokenWithBaseStatistics} from "../entities/tokenWithBaseStatistics";

export class TokenProvider {
  public async findAllByNames(): Promise<TokenWithBaseStatistics[]> {
    try {
      const response = await fetch('http://localhost:3001/api/Token/v1/names', {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return [] as TokenWithBaseStatistics[];
    }
  }


  public async findByAddress(address: string): Promise<TokenWithExtendedStatistics> {
    try {
      const response = await fetch('http://localhost:3001/api/Token/v1/' + address, {
        method: 'GET',
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      return {} as TokenWithExtendedStatistics;
    }
  }


}