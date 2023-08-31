import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from "rxjs";
import { HeroApi } from "../../components/form-hero/entities/interfaces/hero.interface";
import { SkillApi } from "../../components/form-hero/entities/interfaces/skill.interface";
import { HeroLabels } from "../../components/form-hero/entities/enums/hero.enum";
import { SkillLabels } from "../../components/form-hero/entities/enums/skill.enum";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  response: any =[]
  constructor(private readonly http: HttpClient) {
    this.getData()
  }

  public getData(): void {
    this.http.get('http://127.0.0.1:3000/items')
      .subscribe((response) =>{
        this.response = response
        this.heroes.next(this.response)
      })
  }
  public postData(hero: HeroApi){
    this.http.post('http://127.0.0.1:3000/items', hero)
      .subscribe();
  }
  public changeData(hero:HeroApi, id:number){
    this.http.put('http://127.0.0.1:3000/items/'+id, hero)
      .subscribe();
  }

  public heroes: BehaviorSubject<HeroApi[]> = new BehaviorSubject<HeroApi[]>([])
  public heroes$: Observable<any> = this.heroes.asObservable()

  public skills: BehaviorSubject<SkillApi[]> = new BehaviorSubject<SkillApi[]>([{id: 1,name:'speed'}])
  public skills$: Observable<any> = this.skills.asObservable()

  public addHero(hero: HeroApi){
    this.heroes$.pipe(take(1)).subscribe((val) => {
      let heroID : number = 0;
      let heroLen: number = 0
      this.heroes$.subscribe( (heroes) => {
        heroLen = heroes.length
        heroID = heroes[heroLen-1][HeroLabels.ID]+1
      })
      const newHero = {
        ...hero,
        id: heroID
      }
      const newHeroesArray = [...val, newHero]
      this.heroes.next(newHeroesArray)
      this.postData(newHero)
    })
  }

  public addSkill(skill: SkillApi){
    this.skills$.pipe(take(1)).subscribe((val) => {
      let skillLen: number = 0
      let skillID : number = 0;
      this.skills$.subscribe( (skills) => {
        skillLen = skills.length
        skillID = skills[skillLen-1][SkillLabels.ID]+1
      })
      const newSkill: SkillApi = {
        name: skill[SkillLabels.NAME],
        id: skillID
      }
      const newSkillsArray: SkillApi[] = [...val, newSkill]
      this.skills.next(newSkillsArray)
    })

  }
  public changeHero(changedHero: HeroApi){
    this.heroes$.pipe(take(1)).subscribe((heroes) => {
      for (let hero of heroes){
        if (hero.id === changedHero.id){
          hero[HeroLabels.NAME] = changedHero[HeroLabels.NAME]
          hero[HeroLabels.POWER] = changedHero[HeroLabels.POWER]
          hero[HeroLabels.SKILLS] = changedHero[HeroLabels.SKILLS]
          hero[HeroLabels.LEVEL] = changedHero[HeroLabels.LEVEL]
        }
      }
      this.heroes.next(heroes)
      this.changeData(changedHero, changedHero.id)
    })
  }
}
