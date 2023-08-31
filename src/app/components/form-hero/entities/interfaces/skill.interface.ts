import { SkillLabels } from "../enums/skill.enum";

export interface SkillApi {
  [SkillLabels.ID] : number,
  [SkillLabels.NAME] : string,
}
