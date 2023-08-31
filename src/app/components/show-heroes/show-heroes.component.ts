import { Component } from '@angular/core';
import { Observable, take } from "rxjs";
import { AppService } from "../../entities/services/app.service";
import { FormControl, FormGroup } from "@angular/forms";
import { isNumeric } from "devextreme/core/utils/type";
import { HeroLabels } from "../form-hero/entities/enums/hero.enum";
import { SkillLabels } from "../form-hero/entities/enums/skill.enum";
import { HeroApi } from "../form-hero/entities/interfaces/hero.interface";
import { SkillApi } from "../form-hero/entities/interfaces/skill.interface";
import { FilterHeroesService } from "./entities/services/filter-heroes.service";
import { ChangeHeroService } from "./entities/services/change-hero.service";


@Component({
  selector: 'app-show-heroes',
  templateUrl: './show-heroes.component.html',
  styleUrls: ['./show-heroes.component.scss']
})

export class ShowHeroesComponent {

  public _heroes$$: Observable<HeroApi[]>;
  public _skills$$: Observable<SkillApi[]>;

  public isPopupVisible: boolean;
  public currentSkills: SkillLabels.NAME[];

  public filterHeroesForm: FormGroup;
  public changeHeroForm: FormGroup;
  constructor(public readonly appService : AppService,
              private readonly filterHeroesService: FilterHeroesService,
              private readonly changeHeroService: ChangeHeroService) {
    this._heroes$$ = appService.heroes;
    this._skills$$ = appService.skills;
    this.filterHeroesForm = filterHeroesService.getForm();
    this.changeHeroForm = changeHeroService.getForm();
    this.isPopupVisible = false;
    this.currentSkills = [];
  }

  public togglePopup(hero: any, id: number): void {
    this.isPopupVisible = !this.isPopupVisible;
    this.changeHeroForm.controls['name'].setValue(hero.name)
    this.changeHeroForm.controls['power'].setValue(hero.power)
    this.changeHeroForm.controls['skills'].setValue(hero.skills)
    this.changeHeroForm.controls['level'].setValue(hero.level)

    this._heroes$$.pipe(take(1)).subscribe((heroes:HeroApi[]) => {
      for(hero of heroes){
        if (hero.id === id){
          this.currentSkills = hero.skills
        }
      }
    })
  }
  public changeHero(id: number){
    this.changeHeroService.changeHero(id);
    this.isPopupVisible = !this.isPopupVisible;
  }
  protected readonly HeroLabels = HeroLabels;
}
