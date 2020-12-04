import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity } from '../model/entity';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  public generateZipString(entities: Entity[]) {
    let internalEntities = _.cloneDeep(entities);
    console.log(internalEntities);
    
    internalEntities.forEach(e => e.properties = this.selfIterator(e.properties));
    console.log(internalEntities);
    console.log(JSON.stringify(internalEntities));
    
    
    
    return this.http.post("http://localhost:8080/generate",internalEntities, { responseType: 'text' });
  }

      public selfIterator(map) {
          return Array.from(map).reduce((acc, [key, value]) => {
              if (value instanceof Map) {
                  acc[key] = this.selfIterator(value);
              } else {
                  acc[key] = value;
              }

              return acc;
          }, {})
      }
  
}
