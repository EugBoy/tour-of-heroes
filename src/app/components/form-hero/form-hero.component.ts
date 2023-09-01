import { Component } from '@angular/core';
import { HeroApi } from "./entities/interfaces/hero.interface";
import { SkillApi } from "./entities/interfaces/skill.interface";
import { FormGroup } from '@angular/forms'
import { HeroLabels } from "./entities/enums/hero.enum";
import { SkillLabels } from "./entities/enums/skill.enum";
import { AppService } from "../../entities/services/app.service";
import { isNumeric } from "devextreme/core/utils/type";
import { Observable } from "rxjs";
import { FormHeroService } from "./entities/services/form-hero.service"
import { FormSkillService} from "./entities/services/form-skill.service";

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.scss']
})
export class FormHeroComponent {

  public _skills$$: Observable<SkillApi[]>;

  public heroForm: FormGroup;
  public skillForm: FormGroup;
  constructor(private readonly appService: AppService,
              private readonly formHeroService: FormHeroService,
              private readonly formSkillService: FormSkillService) {
    this._skills$$ = appService.skills;
    this.heroForm = formHeroService.getForm()
    this.skillForm = formSkillService.getForm()
  }

  public addSkill(){
    this.formSkillService.addSkill()
  }

  public addHero(){
    this.formHeroService.addHero()
  }
}
