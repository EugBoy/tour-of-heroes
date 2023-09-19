import { SkillLabels } from "../enums/skill.enum";

/**
 * Интерфейс навыка с учётом текущих характеристик
 *
 * @param {number} ID - личный идентификатор навыка
 * @param {string} NAME - название навыка
 *
 */
export interface SkillApi {
  [SkillLabels.ID] : number;
  [SkillLabels.NAME] : string;
}
