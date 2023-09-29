import {Pipe, PipeTransform} from '@angular/core';
import {IHero} from "../../../form-hero/entities/interfaces/hero.interface";
import {LHero} from "../../../form-hero/entities/labels/hero.label";
import {HeroesFilterFormService} from "../services/heroes-filter-form.service";
import {LItem} from "../../../form-hero/entities/labels/item.label";

@Pipe({
  name: 'filterHeroes'
})
export class FilterHeroesPipe implements PipeTransform {

  constructor (
    private readonly _filterHeroService: HeroesFilterFormService
  ) {
  }

  /**
   * Метод делает фильтрацию и сортировку данных о героях.
   *
   * @param {IHero[]} heroes - все герои
   * @param {boolean} sort - статус сортировки (Сортировка или не сортировка)
   * @param {number} levelDown - нижний уровень, от которого идёт сортировка
   * @param {number} levelUp - верхний уровень, до которого идёт сортировка
   * @param {string} name - сортировка по имени
   * @param {IHero[LHero.SKILLS]} skills - сортировка по наличию способностей в персонаже
   * @return {IHero[]}
   *
   * @example [{Name: 'Ivan', level: 100}, {Name: 'Vladimir', level: 1}] --( sort = 1 )--> [{Name: 'Vladimir', level: 1},{Name: 'Ivan', level: 100}]
   */
  transform(heroes: IHero[] | null, sort: number, levelDown: number, levelUp: number, name: string, skills: IHero[LHero.SKILLS]): IHero[] {
    if (sort % 3 == 1){
      heroes = heroes!.sort((hero1:IHero, hero2:IHero) => {
        return hero1[LHero.LEVEL] - hero2[LHero.LEVEL]
      })
    } else if (sort % 3 == 2){
      heroes = heroes!.sort((hero1:IHero, hero2:IHero) => {
        return hero2[LHero.LEVEL] - hero1[LHero.LEVEL]
      })
    } else {
      heroes = heroes!.sort((hero1:IHero, hero2:IHero) => {
        return (hero1[LItem.ID]! - hero2[LItem.ID]!)
      })
    }
    if(levelDown){
      heroes = heroes.filter((hero: IHero): boolean => {
        return Number(hero[LHero.LEVEL]) >= levelDown
      })
    }
    if(levelUp){
      heroes = heroes.filter((hero: IHero): boolean => {
        return Number(hero[LHero.LEVEL]) <= levelUp
      })
    }
    if (name){
      heroes = heroes.filter((hero: IHero) => {
        return hero[LItem.NAME].includes(name)
      })
    }
    if (skills){
      heroes = heroes.filter((hero: IHero): boolean => {
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
