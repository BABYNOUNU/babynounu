export class CreateParentDto {
  fullname: string;
  phone: string;
  adresse: string;
  budget_min: string;
  budget_max: string;
  number_of_children: string;
  payment_terms: string;
  localization: string;
  description: string;
  availabilityServiceProvider: string;
  settingAgeOfChildrens?: string[]; // IDs des enfants liés
  settingSpecificNeeds?: string[]; // IDs des besoins spécifiques
  settingGuardSchedules?: string[]; // IDs des horaires de garde
  settingDesiredTimes?: string[]; // IDs des horaires désirés
  settingHousekeepers?: string[]; // IDs des housekeepers
  settingAreaWorks?: string[]; // IDs des zones de travail
  settingLanguages?: string[]; // IDs des langues
  settingLocalizations?: string[]; // IDs des localisations
  settingSpecificSkills?: string[]; // IDs des compétences spécifiques
  settingServiceFrequency?: string[]; // IDs des fréquences de service
  user?: string; // ID de l'utilisateur lié
  photo: string;
}
