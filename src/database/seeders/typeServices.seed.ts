export const TypeServiceSeeders: {
  name: string; // Nom du besoin spécifique
  description: string; // Description du besoin spécifique
  type_parameter: string;
  slug: string;
}[] = [
  {
    name: 'Nounu',
    slug: 'nounu-type',
    description:
      "Garde d'enfant ponctuelle ou régulière, en fonction des besoins.",
    type_parameter: '20',
  },
  {
    name: 'Menagère',
    slug: 'menagere-type',
    description: 'Aide à la gestion du foyer, des courses, des repas, etc.',
    type_parameter: '20',
  },
  {
    name: 'Autres',
    slug: 'autres-type',
    description: 'Tout autre type de services.',
    type_parameter: '20',
  },
];
