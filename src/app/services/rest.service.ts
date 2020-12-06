import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entity } from '../model/entity';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  public generateZipString(entities: Entity[]) {
    let internalEntities = _.cloneDeep(entities);
    
    internalEntities.forEach(e => e.properties = this.selfIterator(e.properties));
    
    
    return this.http.post(environment.backend_url, internalEntities, { responseType: 'text' });
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
