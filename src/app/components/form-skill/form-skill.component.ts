import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormSkillService} from "./entities/services/form-skill.service";

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.scss']
})
export class FormSkillComponent {

  public skillForm: FormGroup = this._formSkillService.getForm();

  constructor(
    private readonly _formSkillService: FormSkillService) {
  }

  /**
   * Метод обращения к FormSkillService для добавления нового навыка
   */
  public addSkill(){
    this._formSkillService.addSkill(this.skillForm)
  }

}
