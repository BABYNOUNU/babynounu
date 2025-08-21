"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed_AgesOfChildren = void 0;
exports.Seed_AgesOfChildren = [
    {
        name: 'Nourrisson',
        example: '0-12 mois',
        description: 'Enfants en bas âge, besoins particuliers en soins et surveillance.',
    },
    {
        name: 'Petite enfance',
        example: '1-3 ans',
        description: 'Enfants en bas âge, développement moteur et premières interactions sociales.',
    },
    {
        name: 'Préscolaire',
        example: '3-5 ans',
        description: "Préparation pour l'école, forte curiosité et apprentissage social.",
    },
    {
        name: 'École primaire',
        example: '6-10 ans',
        description: "Apprentissage scolaire, développement d'autonomie et socialisation.",
    },
    {
        name: 'Préadolescent',
        example: '11-12 ans',
        description: "Préparation pour l'adolescence, recherche d'indépendance.",
    }
];
const specificNeeds = [
    {
        name: 'Allergies alimentaires',
        examples: ['Arachides', 'Produits laitiers', 'Gluten'],
        description: 'Surveillance alimentaire stricte pour éviter les réactions allergiques.',
    },
    {
        name: 'Allergies environnementales',
        examples: ['Pollen', 'Animaux', 'Poussière'],
        description: 'Précautions nécessaires dans les environnements à risques.',
    },
    {
        name: 'Soins médicaux réguliers',
        examples: ['Diabète', 'Asthme', 'Épilepsie'],
        description: 'Administration de médicaments ou équipement spécial requis.',
    },
    {
        name: 'Support pour handicap physique',
        examples: [
            'Mobilité réduite',
            'Aide à la marche',
            'Assistance pour les transferts',
        ],
        description: "Adaptation de l'espace et soutien physique nécessaire.",
    },
    {
        name: 'Support pour besoins éducatifs',
        examples: ['Dyslexie', 'Troubles de l’attention', 'Autisme'],
        description: "Accompagnement spécialisé pour soutenir l'apprentissage.",
    },
    {
        name: 'Régime alimentaire spécifique',
        examples: ['Végétarien', 'Casher', 'Sans lactose'],
        description: 'Planification des repas selon les restrictions alimentaires.',
    },
    {
        name: "Soins d'hygiène particuliers",
        examples: ['Changement de couche', 'Aide à la toilette'],
        description: 'Assistance requise pour les soins d’hygiène.',
    },
    {
        name: 'Support sensoriel',
        examples: [
            'Sensibilité au bruit',
            'Besoin de calme',
            'Préférence pour certains tissus',
        ],
        description: "Adaptation de l'environnement pour éviter les surcharges sensorielles.",
    },
    {
        name: 'Gestion des comportements',
        examples: [
            'Crises de colère',
            'Routine structurée',
            'Besoin de supervision constante',
        ],
        description: 'Surveillance et approche bienveillante pour répondre aux besoins comportementaux.',
    },
    {
        name: 'Support émotionnel',
        examples: ['Anxiété', 'Difficulté de séparation', 'Timidité extrême'],
        description: "Approche douce pour gérer les émotions et rassurer l'enfant.",
    },
    {
        name: "Restrictions d'activité physique",
        examples: [
            'Pas de sport intense',
            'Activités douces seulement',
            'Adaptation en cas de fatigue',
        ],
        description: "Planification d'activités en fonction des capacités physiques.",
    },
    {
        name: 'Problèmes de sommeil',
        examples: ['Sommeil agité', 'Terreurs nocturnes', 'Réveil fréquent'],
        description: 'Routine de sommeil ou assistance pour les aider à mieux dormir.',
    },
    {
        name: 'Encouragements pour autonomie',
        examples: [
            "Apprendre à s'habiller seul",
            'Encouragement à la prise de décision',
            'Développement de la confiance',
        ],
        description: "Encouragement de l'indépendance et apprentissage des compétences de vie.",
    },
];
const Date_type_of_service_sought = [
    {
        name: "Garde d’enfants",
        actived: true,
        data: [
            {
                name: "Nounou à temps plein",
            },
            {
                name: "Nounou à partiel",
            },
            {
                name: "Baby-sitting occasionnel",
            },
        ],
    },
    {
        name: "Aide ménagère",
        actived: false,
        data: [
            {
                name: "Entretien de la maison",
            },
            {
                name: "Repassage",
            },
            {
                name: "Nettoyage de printemps",
            },
            {
                name: "Cuisine",
            },
            {
                name: "Courses",
            },
        ],
    },
];
