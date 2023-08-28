import {Component} from '@angular/core';
import {Observable, take} from "rxjs";
import {AppService} from "../../app.service";
import {FormControl} from "@angular/forms";
import {isNumeric} from "devextreme/core/utils/type";
import {HeroLabels, SkillLabels} from "../form-hero/entities/enums/form-hero.enum";
import {HeroApi, SkillApi} from "../form-hero/interfaces/form-hero.interface";


@Component({
  selector: 'app-show-heroes',
  templateUrl: './show-heroes.component.html',
  styleUrls: ['./show-heroes.component.scss']
})

export class ShowHeroesComponent {
  levelDown: FormControl <number | null> = new FormControl();
  levelUp: FormControl <number | null> = new FormControl();
  heroSkills: FormControl <HeroLabels.SKILLS | null> = new FormControl();
  heroName: FormControl <HeroLabels.NAME | null> = new FormControl();
  heroSort : FormControl <boolean | null> = new FormControl(false);

  changeName: FormControl <HeroLabels.NAME | null> = new FormControl();
  changePower: FormControl <HeroLabels.POWER | null> = new FormControl();
  changeSkills: FormControl <HeroLabels.SKILLS | null> = new FormControl();
  changeLevel: FormControl <HeroLabels.LEVEL | null> = new FormControl();

  heroes$: Observable<HeroApi[]>
  skills$: Observable<SkillApi[]>

  isPopupVisible: boolean
  currentSkills: SkillLabels.NAME[]

  constructor(public appService : AppService) {
    this.heroes$ = appService.heroes
    this.skills$ = appService.skills
    this.isPopupVisible = false
    this.currentSkills = []
  }

  togglePopup(hero: any, id: number): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.changeName = new FormControl(hero.name);
    this.changePower = new FormControl(hero.power);
    this.changeSkills = new FormControl(hero.skills);
    this.changeLevel = new FormControl(hero.level);
    this.heroes$.pipe(take(1)).subscribe((heroes) => {
      for(hero of heroes){
        if (hero.id === id){
          this.currentSkills = hero.skills
        }
      }
    })
  }
  changeHero(id: number, hero: HeroApi){
    let changedHero: HeroApi = {
      id,
      name: this.changeName.value!,
      power: this.changePower.value!,
      skills: String(this.changeSkills.value).split(','),
      level: Number(this.changeLevel.value),
    }
    if (( changedHero.name!.length >= 2) && (changedHero.power!.length >=2) && (isNumeric(changedHero.level))) {
      this.appService.changeHero(changedHero);
      this.changeName.reset();
      this.changePower.reset();
      this.changeSkills.reset();
      this.changeLevel.reset();
    } else {
      alert('You have made mistake.')
    }
    this.togglePopup(hero, id)
  }
  protected readonly HeroLabels = HeroLabels;
}
