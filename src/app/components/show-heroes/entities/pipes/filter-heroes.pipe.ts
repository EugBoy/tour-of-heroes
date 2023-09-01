import { Pipe, PipeTransform } from '@angular/core';
import { HeroApi } from "../../../form-hero/entities/interfaces/hero.interface";
import { HeroLabels } from "../../../form-hero/entities/enums/hero.enum";
import { FormGroup } from "@angular/forms";
import { FilterHeroesService } from "../services/filter-heroes.service";

@Pipe({
  name: 'filterHeroes'
})
export class FilterHeroesPipe implements PipeTransform {
  public filterForm: FormGroup
  constructor(private filterHeroService: FilterHeroesService) {
    this.filterForm = filterHeroService.getForm()
  }

  /**
   * Фильтрация героев по заданным характеристикам
   *
   * @param {HeroApi[]} heroes - все герои
   * @param {boolean} sort - статус сортировки героев по возрастанию уровня
   * @param {number} levelDown - нижний уровень от которого происходит фильтрация героев по уровню
   * @param {number} levelUp - верхний уровень от которого происходит фильтрация героев по уровню
   * @param {string} name - фильтрация по имени
   * @param {string[]} skills - фильтрация по содержащимся навыкам
   */
  transform(heroes: HeroApi[] | null, sort: boolean, levelDown: number, levelUp: number, name: string, skills: HeroLabels.SKILLS): HeroApi[] {
    if (Boolean(sort)){
      heroes = heroes!.sort((hero1:HeroApi, hero2:HeroApi) => {
        return hero1[HeroLabels.LEVEL] - hero2[HeroLabels.LEVEL]
      })
    } else {
      heroes = heroes!.sort((hero1:HeroApi, hero2:HeroApi) => {
        return (hero1[HeroLabels.ID]- hero2[HeroLabels.ID])
      })
    }
    if(levelDown){
      heroes = heroes!.filter((hero: HeroApi): boolean => {
        return hero[HeroLabels.LEVEL] >= levelDown
      })
    }
    if(levelUp){
      heroes = heroes!.filter((hero: HeroApi): boolean => {
        return hero[HeroLabels.LEVEL] <= levelUp
      })
    }

    if (name){
      heroes = heroes!.filter((hero: HeroApi) => {
        return hero[HeroLabels.NAME].includes(name)
      })
    }
    if (skills){
      heroes = heroes!.filter((hero: HeroApi): boolean => {
        for (let skill of skills){
          if (!hero[HeroLabels.SKILLS].includes(skill)){
            return false
          }
        }
        return true
      })
    }
    return heroes
  }
}
