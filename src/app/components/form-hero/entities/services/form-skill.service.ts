import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppService } from "../../../../entities/services/app.service";

@Injectable({
  providedIn: 'root'
})
export class FormSkillService {
  public skillForm: FormGroup
  constructor(private readonly fb: FormBuilder,
              private readonly appService: AppService) {
    this.skillForm = fb.group({
      name:''
    })
  }

  public getForm(){
    return this.skillForm
  }

  public addSkill(){
    if (this.skillForm.controls['name'].value!.length >= 2){
      this.appService.addSkill(
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
