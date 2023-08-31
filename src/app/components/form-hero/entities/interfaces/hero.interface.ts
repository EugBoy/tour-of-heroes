import { HeroLabels } from "../enums/hero.enum";
export interface HeroApi {
  [HeroLabels.ID] : number,
  [HeroLabels.NAME] : string,
  [HeroLabels.POWER] : string,
  [HeroLabels.SKILLS] : string[],
  [HeroLabels.LEVEL] : number,

}

