import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHeroes'
})
export class FilterHeroesPipe implements PipeTransform {

  transform(heroes: any, sort: any, levelDown: any, levelUp: any, name: any, skills: any): any {
    if (sort){
      heroes = heroes.sort((hero1:any, hero2:any) => {
        return hero1.level- hero2.level
      })
    } else {
      heroes = heroes.sort((hero1:any, hero2:any) => {
        return (hero1.id- hero2.id)
      })
    }
    if( levelDown != null && levelDown != ''){
      heroes = heroes.filter((hero: any) => {
        return hero.level >= levelDown
      })
    }
    if( levelUp != null && levelUp != ''){
      heroes = heroes.filter((hero: any) => {
        return hero.level <= levelUp
      })
    }

    if ( name != null && name != ''){
      heroes = heroes.filter((hero: any) => {
        return hero.name.includes(name)
      })
    }
    if ( skills != null && skills != ''){
      let flag= true
      heroes = heroes.filter((hero: any) => {
        for (let skill of skills){
          if (!hero.skills.includes(skill)){
            return false
          }
        }
        return true
      })
    }
    return heroes
  }

}
