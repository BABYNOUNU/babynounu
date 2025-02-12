export const PaymentTermSeeders: { name: string; description: string; slug: string; type_parameter: string }[] = [
    { 
      name: "Mobile Money", 
      description: "Paiement rapide et sécurisé via des services tels que Orange Money, MTN Mobile Money, ou Moov Money." ,
      slug: 'mobile-money',
      type_parameter: '12'
    },
    { 
      name: "Carte bancaire", 
      description: "Paiement via carte de crédit ou débit, accepté dans l'application pour des transactions sécurisées." ,
      slug: 'bank-card',
      type_parameter: '12'
    },
    { 
      name: "Espèces", 
      description: "Paiement direct en espèces au prestataire, pratique pour des services ponctuels." ,
      slug: 'cash',
      type_parameter: '12'
    },
    { 
      name: "Virement bancaire", 
      description: "Transfert direct depuis un compte bancaire, idéal pour des services réguliers ou à long terme." ,
      slug: 'bank-transfer',
      type_parameter: '12'
    },
    { 
      name: "Chèque", 
      description: "Paiement par chèque, convenant pour les transactions plus formelles ou de gros montants." ,
      slug: 'check',
      type_parameter: '12'
    },
    { 
      name: "Paiement en ligne", 
      description: "Utilisation de passerelles comme PayPal, Stripe ou Flutterwave pour des paiements numériques." ,
      slug: 'online-payment',
      type_parameter: '12'
    },
    { 
      name: "Cryptomonnaies", 
      description: "Paiement via Bitcoin, Ethereum ou d'autres cryptomonnaies, pour une expérience moderne et sécurisée." ,
      slug: 'cryptocurrencies',
      type_parameter: '12'
    },
    { 
      name: "Autre", 
      description: "Un mode de paiement personnalisé peut être discuté selon vos préférences." ,
      slug: 'other',
      type_parameter: '12'
    }
  ];
  

