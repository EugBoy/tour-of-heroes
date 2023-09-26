import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AppService } from "../../../../entities/services/app.service";
import {LItem} from "../../../form-hero/entities/enums/item.enum";

@Injectable({
  providedIn: 'root'
})
export class FormSkillService {
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _appService: AppService) {
  }

  /**
   * Метод возвращает форму нового навыка
   */
  public getForm(): FormGroup{
    return this._formBuilder.group({
    [LItem.NAME]:['', Validators.minLength(2)]
    })
  }

  /**
   * Метод добавления нового навыка
   */
  public addSkill(skillForm: FormGroup){
    if (skillForm.valid){
      this._appService.addSkill(skillForm.getRawValue())
      skillForm.reset()
    } else {
      alert('You have made mistake.')
    }
  }

}
