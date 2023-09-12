import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppService } from "../../../../entities/services/app.service";
import {LItem} from "../enums/item.enum";

@Injectable({
  providedIn: 'root'
})
export class FormSkillService {
  public skillForm: FormGroup = this._formBuilder.group({
    name:''
  })
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _appService: AppService) {
  }

  /**
   * Метод возвращает форму нового навыка
   */
  public getForm(): FormGroup{
    return this.skillForm
  }

  /**
   * Метод добавления нового навыка
   */
  public addSkill(){
    if (this.controls['name'].value!.length >= 2){
      this._appService.addSkill(
        {
          [LItem.NAME]: this.controls[LItem.NAME].value
        }
      )
      this.skillForm.reset()
    } else {
      alert('You have made mistake.')
    }
  }

  get controls(){
    return  this.skillForm.controls
  }
}
