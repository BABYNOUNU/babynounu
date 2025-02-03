interface SpecificNeed {
  name: string; // Nom du besoin spécifique
  description: string; // Description du besoin spécifique
  type_parameter: string;
}

const specificNeedSeeders: SpecificNeed[] = [
  {
    name: "Allergies alimentaires",
    description: "Intolérance ou réaction allergique à certains aliments comme les arachides, le lactose, le gluten, etc",
    type_parameter: "3" // Type de paramètre : 3 = oui/non
  },
  {
    name: "Soins médicaux spécifiques",
    description: "Administration régulière de médicaments, surveillance médicale ou présence de dispositifs médicaux.",
    type_parameter: "3" // Type de paramètre : 1 = Texte
  },
  {
    name: "Difficultés d'apprentissage",
    description: "Besoin d'accompagnement supplémentaire en raison de troubles comme la dyslexie, la dyspraxie, etc.",
    type_parameter: "3" // Type de paramètre : 2 = Liste
  },
  {
    name: "Handicap physique",
    description: "Nécessité d’aménagements pour un enfant ayant une mobilité réduite ou des besoins d’accessibilité.",
    type_parameter: "3" // Type de paramètre : 3 = oui/non
  },
  {
    name: "Troubles comportementaux",
    description: "Besoin d’un suivi particulier pour gérer des troubles comme l’autisme, le TDAH, etc.",
    type_parameter: "3" // Type de paramètre : 2 = Liste
  },
  {
    name: "Régime alimentaire particulier",
    description: "Respect d’un régime végétarien, végétalien ou autre, pour des raisons culturelles, religieuses ou de santé.",
    type_parameter: "3" // Type de paramètre : 3 = oui/non
  },
  {
    name: "État émotionnel sensible",
    description: "Accompagnement pour gérer une anxiété, des phobies ou des troubles émotionnels.",
    type_parameter: "3" // Type de paramètre : 2 = Liste
  },
  {
    name: "Problèmes de vision ou d'audition",
    description: "Utilisation d’aides spécifiques comme des lunettes, des appareils auditifs ou une langue des signes.",
    type_parameter: "3" // Type de paramètre : 2 = Liste
  },
  {
    name: "Besoin d’une surveillance constante",
    description: "Nécessité d’une attention continue en raison d’un risque de fugue ou d’autres comportements imprévisibles.",
    type_parameter: "3" // Type de paramètre : 3 = oui/non
  },
  {
    name: "Soins spécifiques liés à l’âge",
    description: "Nécessité d’aide pour des besoins courants comme l’hygiène, l’alimentation ou la toilette.",
    type_parameter: "3" // Type de paramètre : 2 = Liste
  },
];

export default specificNeedSeeders;