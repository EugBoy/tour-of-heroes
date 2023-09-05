import { Pipe, PipeTransform } from '@angular/core';
import { HeroApi } from "../../../form-hero/entities/interfaces/hero.interface";
import { LHero } from "../../../form-hero/entities/enums/hero.enum";
import { FormGroup } from "@angular/forms";
import { FilterHeroesService } from "../services/filter-heroes.service";
import {LItem} from "../../../form-hero/entities/enums/item.enum";

@Pipe({
  name: 'filterHeroes'
})
export class FilterHeroesPipe implements PipeTransform {
  public filterForm: FormGroup
  constructor(filterHeroService: FilterHeroesService) {
    this.filterForm = filterHeroService.getForm()
  }

  transform(heroes: HeroApi[] | null, sort: boolean, levelDown: number, levelUp: number, name: string, skills: LHero.SKILLS): HeroApi[] {
    if (Boolean(sort)){
      heroes = heroes!.sort((hero1:HeroApi, hero2:HeroApi) => {
        return hero1[LHero.LEVEL] - hero2[LHero.LEVEL]
      })
    } else {
      heroes = heroes!.sort((hero1:HeroApi, hero2:HeroApi) => {
        return (hero1[LItem.ID]! - hero2[LItem.ID]!)
      })
    }
    if(levelDown){
      heroes = heroes!.filter((hero: HeroApi): boolean => {
        return hero[LHero.LEVEL] >= levelDown
      })
    }
    if(levelUp){
      heroes = heroes!.filter((hero: HeroApi): boolean => {
        return hero[LHero.LEVEL] <= levelUp
      })
    }

    if (name){
      heroes = heroes!.filter((hero: HeroApi) => {
        return hero[LItem.NAME].includes(name)
      })
    }
    if (skills){
      heroes = heroes!.filter((hero: HeroApi): boolean => {
        for (let skill of skills){
          if (!hero[LHero.SKILLS].includes(skill)){
            return false
          }
        }
        return true
      })
    }
    return heroes
  }
}
