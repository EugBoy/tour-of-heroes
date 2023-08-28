import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, take} from "rxjs";
import {HeroApi, SkillApi} from "./components/form-hero/interfaces/form-hero.interface";
import {HeroLabels, SkillLabels} from "./components/form-hero/entities/enums/form-hero.enum";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  response: any =[]
  constructor(private http: HttpClient) {
    this.getData()
  }

  getData(): void {
    this.http.get('http://127.0.0.1:3000/items')
      .subscribe((response) =>{
        this.response = response
        this.heroes.next(this.response)
      })
  }
  postData(hero: HeroApi){
    this.http.post('http://127.0.0.1:3000/items', hero)
      .subscribe();
  }
  changeData(hero:HeroApi, id:number){
    this.http.put('http://127.0.0.1:3000/items/'+id, hero)
      .subscribe();
  }

  heroes: BehaviorSubject<HeroApi[]> = new BehaviorSubject<HeroApi[]>([])
  heroes$: Observable<any> = this.heroes.asObservable()

  skills: BehaviorSubject<SkillApi[]> = new BehaviorSubject<SkillApi[]>([{id: 1,name:'speed'}])
  skills$: Observable<any> = this.skills.asObservable()

  addHero(hero: HeroApi){
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

  addSkill(skill: SkillApi){
    this.skills$.pipe(take(1)).subscribe((val) => {
      let skillLen: number = 0
      let skillID : number = 0;
      this.skills$.subscribe( (skills) => {
        skillLen = skills.length
        skillID = skills[skillLen-1][SkillLabels.ID]+1
      })
      const newSkill: SkillApi = {
        name:skill[SkillLabels.NAME],
        id: skillID
      }
      const newSkillsArray: SkillApi[] = [...val, newSkill]
      this.skills.next(newSkillsArray)
    })

  }
  changeHero(changedHero: HeroApi){
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
