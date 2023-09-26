import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormSkillService} from "./entities/services/form-skill.service";
import {LHero} from "../form-hero/entities/enums/hero.enum";
import {LItem} from "../form-hero/entities/enums/item.enum";

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
    if (this.skillForm.valid){
      this._formSkillService.addSkill(this.skillForm)
    } else {
      alert('При заполнении допущена ошибка.')
    }
  }

  protected readonly LHero = LHero;
  protected readonly LItem = LItem;
}
