import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from "rxjs";
import { HeroApi } from "../../components/form-hero/entities/interfaces/hero.interface";
import { ItemApi } from "../../components/form-hero/entities/interfaces/item.interface";
import { LItem } from "../../components/form-hero/entities/enums/item.enum";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public heroes: BehaviorSubject<HeroApi[]> = new BehaviorSubject<HeroApi[]>([]);
  public _heroes$$: Observable<HeroApi[]> = this.heroes.asObservable();

  public skills: BehaviorSubject<ItemApi[]> = new BehaviorSubject<ItemApi[]>([{id: 1,name:'speed'}]);
  public _skills$$: Observable<ItemApi[]> = this.skills.asObservable();

  constructor(private readonly http: HttpClient) {
    this.getHeroes()
  }

  /**
   * Метод получения данных с сервера.
   */
  public getHeroes(): void {
    this.http.get('http://127.0.0.1:3000/items')
      .subscribe((response: Object) =>{
        // @ts-ignore
        this.heroes.next(response.valueOf())
      })
  }

  /**
   * Метод отправки данных о герое на сервер и получения новых данных героев с сервера.
   *
   *@param hero: HeroApi - данные о герое.
   */
   public addHero (hero: HeroApi){
    // let newHero: HeroApi;
    this.http.post('http://127.0.0.1:3000/items', hero)
      .subscribe((request)=> {
        this.getHeroes()
      })
  }

  /**
   * Метод изменения данных о герое и получения новых данных о героях.
   *
   * @param changedHero: HeroApi - данные изменившегося героя
   */
  public changeHero(changedHero: HeroApi){
    this.http.put('http://127.0.0.1:3000/items/'+changedHero[LItem.ID], changedHero)
      .subscribe( () => {
        this.getHeroes();
        }
      );
  }

  public addSkill(skill: ItemApi){
    this._skills$$.pipe(take(1)).subscribe((val) => {
      let skillLen: number = 0
      let skillID : number = 0;
      this._skills$$.subscribe( (skills) => {
        skillLen = skills.length
        skillID = skills[skillLen-1][LItem.ID]!+1
      })
      const newSkill: ItemApi = {
        name: skill[LItem.NAME],
        id: skillID
      }
      const newSkillsArray: ItemApi[] = [...val, newSkill]
      this.skills.next(newSkillsArray)
    })
  }
}
