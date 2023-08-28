import {Component} from '@angular/core';
import {HeroApi, SkillApi} from "./interfaces/form-hero.interface";
import {FormControl} from '@angular/forms'
import {HeroLabels, SkillLabels} from "./entities/enums/form-hero.enum";
import {AppService} from "../../app.service";
import {isNumeric} from "devextreme/core/utils/type";
import {Observable} from "rxjs";

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.scss']
})
export class FormHeroComponent {

  heroName: FormControl <HeroLabels.NAME | null> = new FormControl(null);
  heroPower: FormControl <HeroLabels.POWER | null> = new FormControl(null);
  heroSkills: FormControl <HeroLabels.SKILLS | null> = new FormControl(null);
  heroLevel: FormControl <HeroLabels.LEVEL | null> = new FormControl(null);
  newSkill : FormControl <SkillLabels.NAME | null> = new FormControl(null);

  skills$: Observable<SkillApi[]>

  constructor(private appService: AppService) {
    this.skills$ = appService.skills
  }

  addSkill(){
    if (this.newSkill.value!.length >= 2){
      this.appService.addSkill(
        {
          id: 0,
          name: this.newSkill.value!
        }
      )
      this.newSkill.reset()
    } else {
      alert('You have made mistake.')
    }
  }

  addHero(){
    let heroSkills = String(this.heroSkills.value!).split(',')
    let hero: HeroApi = {
          id: 0,
          name: this.heroName.value!,
          power: this.heroPower.value!,
          skills: heroSkills,
          level: Number(this.heroLevel.value),
        }
    if (( hero.name!.length >= 2) && (hero.power!.length >=2) && (isNumeric(hero.level))) {
      this.appService.addHero(hero);
      this.heroName.reset();
      this.heroPower.reset();
      this.heroSkills.reset();
      this.heroLevel.reset();
    } else {
      alert('You have made mistake.')
    }
  }
}
