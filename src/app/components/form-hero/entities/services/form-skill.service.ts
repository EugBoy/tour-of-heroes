import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppService } from "../../../../entities/services/app.service";

@Injectable({
  providedIn: 'root'
})
export class FormSkillService {
  public skillForm: FormGroup
  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _appService: AppService) {
    this.skillForm = _formBuilder.group({
      name:''
    })
  }

  /**
   * Метод возвращает форму нового навыка
   */
  public getForm(): FormGroup{
    return this.skillForm
  }


  public addSkill(){
    if (this.skillForm.controls['name'].value!.length >= 2){
      this._appService.addSkill(
        {
          id: 0,
          name: this.skillForm.controls['name'].value!
        }
      )
      this.skillForm.reset()
    } else {
      alert('You have made mistake.')
    }
  }
}
