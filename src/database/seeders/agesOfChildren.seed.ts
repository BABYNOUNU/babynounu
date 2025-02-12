interface AgesOfChildren {
  name: string; // Nom du besoin spécifique
  description: string; // Description du besoin spécifique
  type_parameter: string;
  slug: string;
}

const agesOfChildrenSeeders: AgesOfChildren[] = [
  {
    name: 'Nourrisson',
    description:
      'Enfants en bas âge, besoins particuliers en soins et surveillance.',
    type_parameter: '3',
    slug: 'nourrisson'
  },
  {
    name: 'Petite enfance',
    description:
      'Enfants en bas âge, développement moteur et premières interactions sociales.',
    type_parameter: '3',
    slug: 'petite-enfance'
  },
  {
    name: 'Préscolaire',
    description:
      "Préparation pour l'école, forte curiosité et apprentissage social.",
    type_parameter: '3',
    slug: 'prescolaire'
  },
  {
    name: 'École primaire',
    description:
      "Apprentissage scolaire, développement d'autonomie et socialisation.",
    type_parameter: '3',
    slug: 'ecole-primaire'
  },
  {
    name: 'Préadolescent',
    description: "Préparation pour l'adolescence, recherche d'indépendance.",
    type_parameter: '3',
    slug: 'preadolescent'
  },
];

export default agesOfChildrenSeeders;

