/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';


@Injectable()
export class ScrapUtil {

  async scrap(url: string, target: string): Promise<any> {
    try {
      // HTTP GET 요청으로 웹 페이지 내용 가져오기 (바이너리 데이터로)
      const { data } = await axios.get(url, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary'
      });

      // KSC5601 문자셋으로 디코딩
      const decodedData = iconv.decode(Buffer.from(data), 'EUC-KR');

      // cheerio로 HTML 파싱
      const $ = cheerio.load(decodedData);

      const result = $(target).map((_, el) => $(el).text()).get();

      return result;

    } catch (error) {
      console.error('웹 스크래핑 중 오류 발생');
      return null;
    }
  }

}