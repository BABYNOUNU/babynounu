const GuardScheduleSeeders: { name: string; description: string; slug: string, type_parameter: string }[] = [
    { 
      name: "Temps plein", 
      slug: "temps-plein",
      description: "Garde d'enfants assurée à temps plein pour répondre aux besoins des parents travaillant toute la journée.",
      type_parameter: '5'
    },
    { 
      name: "Temps partiel", 
      slug: "temps-partiel",
      description: "Service de garde d'enfants pour des périodes limitées dans la journée ou la semaine.",
      type_parameter: '5'
    },
    { 
      name: "Baby-sitting occasionnel", 
      slug: "baby-sitting-occasionnel",
      description: "Garde d'enfants ponctuelle pour les parents ayant des engagements spécifiques.",
      type_parameter: '5'
    },
    { 
      name: "Garde de nuit", 
      slug: "garde-de-nuit",
      description: "Service de garde d'enfants pendant la nuit pour permettre aux parents de se reposer ou de travailler.",
      type_parameter: '5'
    },
    { 
      name: "Garde périscolaire", 
      slug: "garde-periscolaire",
      description: "Prise en charge des enfants avant ou après l'école, avec possibilité d'accompagnement pour les devoirs.",
      type_parameter: '5'
    },
    { 
      name: "Garde d'urgence", 
      slug: "garde-d-urgence",
      description: "Service rapide pour les situations imprévues nécessitant une garde immédiate.",
      type_parameter: '5'
    },
    { 
      name: "Garde à domicile", 
      slug: "garde-a-domicile",
      description: "Service personnalisé où l'enfant est gardé dans le confort de son propre domicile.",
      type_parameter: '5'
    },
    { 
      name: "Garde partagée", 
      slug: "garde-partagee",
      description: "Service de garde organisé entre plusieurs familles pour partager les coûts et socialiser les enfants.",
      type_parameter: '5'
    },
    { 
      name: "Activités éducatives", 
      slug: "activites-educatives",
      description: "Service de garde incluant des activités d'apprentissage adaptées à l'âge des enfants.",
      type_parameter: '5'
    },
    { 
      name: "Garde spécialisée", 
      slug: "garde-specialisee",
      description: "Prise en charge d'enfants avec des besoins spécifiques, tels que les enfants en situation de handicap.",
      type_parameter: '5'
    }
  ];
  
  export default GuardScheduleSeeders;

