import {HeroLabels, SkillLabels} from "../entities/enums/form-hero.enum";
export interface HeroApi {
  [HeroLabels.ID] : number,
  [HeroLabels.NAME] : string,
  [HeroLabels.POWER] : string,
  [HeroLabels.SKILLS] : string[],
  [HeroLabels.LEVEL] : number,

}
export interface SkillApi {
  [SkillLabels.ID] : number,
  [SkillLabels.NAME] : string,
}
