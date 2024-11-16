/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";



@Injectable()
export class EnumUtil {

    getEnumKeys(enumObj: any): string[] {
        return Object.keys(enumObj).filter(key => isNaN(Number(key)));
    }

    getEnumMap(enumObj: any): Map<string, string> {
        const enumMap = new Map<string, string>();
        Object.keys(enumObj).forEach(key => {
          if (isNaN(Number(key))) {
            enumMap.set(key, enumObj[key]);
          }
        });
        return enumMap;
      }
}