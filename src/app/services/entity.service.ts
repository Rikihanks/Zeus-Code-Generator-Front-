import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Entity } from '../model/entity';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private addedEntities = new BehaviorSubject<Entity[]>([]);
  private currentEntity = new BehaviorSubject<Entity>(new Entity());

  constructor() { }

  public getAddedEntitiesObservable(): Observable<Entity[]> {
    return this.addedEntities.asObservable();
  }

  public setAddedEntities(entities: Entity[]) {
    this.addedEntities.next(entities);
  }

  public getCurrentEntityObservable(): Observable<Entity> {
    return this.currentEntity.asObservable();
  }

  public setCurrentEntity(entity: Entity) {
    this.currentEntity.next(entity);
  }

}
