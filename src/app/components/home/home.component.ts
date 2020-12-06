import { Component, OnInit } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Entity } from 'src/app/model/entity';
import { EntityService } from 'src/app/services/entity.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private entityService: EntityService, private restService: RestService) { }

  entities_ : Entity[] = [];
  currentEntity : Entity;
  currentType: string = null;
  currentTypeName: string =null;
  hint = "Ex: List<User>  Must be correctly spelled"
  canShowOtherField = false;
  canDisableForm = false;
  loading = false;
  
  ngOnInit(): void {
    this.entityService.getAddedEntitiesObservable().subscribe(entities => {
      this.entities_ = entities;
    })
    this.entityService.getCurrentEntityObservable().subscribe(entity => {
      this.currentEntity = entity;
    })
    
  }

  onSelectedEntityChange(event, entity) {
    this.canDisableForm = true;
    this.currentEntity = event.option.value;
    const matSelect: MatSelect = event.source;
    matSelect.writeValue(null);
  }

  resetEntityForm() {
    this.canDisableForm = false;
    this.currentEntity = new Entity();
    
    this.currentType = null;
    this.currentTypeName = null;
  }

  addEntity() {
    this.entities_.push(this.currentEntity);
    this.entityService.setAddedEntities(this.entities_);
    this.entityService.setCurrentEntity(new Entity())

    this.currentType = null;
    this.currentTypeName = null;
    
  }
  
  removeEntity() {
    this.entities_.splice(this.entities_.indexOf(this.currentEntity),1)
    this.entityService.setAddedEntities(this.entities_);
    this.resetEntityForm();
  }

  addProperty() {
    this.currentEntity.properties.set(this.currentTypeName, this.currentType);
    this.currentType = null;
    this.currentTypeName = null;
  }

  notifyChangeSelect(fieldType: string) {
    this.canShowOtherField = fieldType != ""  ? false: true;
  }

  deleteProp(key: string){
    this.currentEntity.properties.delete(key);
  }

  generateCode() {
    this.loading = true;   
    this.restService.generateZipString(this.entities_).subscribe(res =>{
      let blob = this.base64toBlob(res, 'application/zip')
      
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a") as any;
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "generated.zip";
      a.click();
      window.URL.revokeObjectURL(url);

      this.loading = false;   
    }, err => {
      console.log(err);
      this.loading = false;   
    })

    
 
  }


   base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}


}
