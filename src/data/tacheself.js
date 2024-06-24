
const columns = [
    {
        name: '#',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Utilisateur',
        selector: row => row.username,
    },
    {
        name: 'Description',
        selector: row => row.evenement,
    },
    {
        name: 'Application',
        selector: row => row.application,
    },
    {
        name: 'Reference Vendeur',
        selector: row => row.refClient,
    },
    {
        name: 'Date de Création',
        selector: row => row.timestamp,
        sortable: true,
    },
];

const data=[
    {
        id:1,
        libelle:"Acquittement Doublons",
        desc:"Acquittement Doublons Paiement",
        app:"OBELIX",
        date:"2023-11-15"
    },
    {
        id:2,
        libelle:"MAJ Manuelle MOBILE",
        desc:"MAJ Manuelle MOBILE",
        app:"OBELIX",
        date:"2023-11-15"
    },
    {
        id:3,
        libelle:"Suppression Sous Compte",
        desc:"Suppression Sous Compte",
        app:"MAXIT",
        date:"2023-10-24"
    } ,
    {
        id:4,
        libelle:"Historique Transaction par ND",
        desc:"Historique Transaction par ND",
        app:"MAXIT",
        date:"2023-10-12"
    } ,
    {
        id:5,
        libelle:"Export Utilisateurs MaxIT",
        desc:"Export bd utilisateurs pour une periode donnee MaxIT",
        app:"MAXIT",
        date:"2023-10-12"
    },
    {
        id:6,
        libelle:"Export Transaction MaxIT",
        desc:"Export des transactions MaxIT",
        app:"MAXIT",
        date:"	2023-10-12"
    },
    //  {
    //     id:7,
    //      libelle:"Verification Existence Compte MaxIT",
    //      desc:"Verification Existence Compte MaxIT",
    //      app:"MAXIT",
    //      date:"2023-10-12"
    // },
    // {
    //     id:8,
    //     libelle:"Creation Compte Externe en masse",
    //     desc:"Creation Compte Externe en masse",
    //     app:"Active Directory",
    //     date:"2023-09-22"
    // },
    // {
    //     id:9,
    //     libelle:"Verif Existence Compte",
    //     desc:"Verif Existence Compte user",
    //     app:"SIMPLISSIMO",
    //     date:"2023-08-17"
    // },
    // {
    //     id:10,
    //     libelle:"Collecte Last Users Connexion",
    //     desc:"Collecte Last Users Connexion pour les applications GAIA - SIMPLISSIMO - NESSICO - KIBARU - BANDEAU - ORACLE",
    //     app:"SECIRUTE",
    //     date:"2023-04-06"
    // },
    // {
    //     id:11,
    //     libelle:"Export Parc Client Actif",
    //     desc:"Export Parc Client Actif",
    //     app:"SELFCAREB2B",
    //     date:"2022-12-13"
    // }, 
    // {
    //     id:12,
    //     libelle:"Masse GetInfoIN",
    //     desc:"Extraction des infos HLR et IN",
    //     app:"PRONETWORK	",
    //     date:"2022-12-13"
    // }
]
const taches=[
    {
        id:1,
        libelle:"Acquittement Doublons",
        desc:"Acquittement Doublons Paiement",
        app:"OBELIX",
        date:"2023-11-15"
    },
    {
        id:2,
        libelle:"MAJ Manuelle MOBILE",
        desc:"MAJ Manuelle MOBILE",
        app:"OBELIX",
        date:"2023-11-15"
    },
    {
        id:3,
        libelle:"Suppression Sous Compte",
        desc:"Suppression Sous Compte",
        app:"MAXIT",
        date:"2023-10-24"
    } ,
    {
        id:4,
        libelle:"Historique Transaction par ND",
        desc:"Historique Transaction par ND",
        app:"MAXIT",
        date:"2023-10-12"
    } ,
    {
        id:5,
        libelle:"Export Utilisateurs MaxIT",
        desc:"Export bd utilisateurs pour une periode donnee MaxIT",
        app:"MAXIT",
        date:"22023-10-12"
    },
    {
        id:6,
        libelle:"Export Transaction MaxIT",
        desc:"Export des transactions MaxIT",
        app:"MAXIT",
        date:"	2023-10-12"
    },
     {
        id:7,
         libelle:"Verification Existence Compte MaxIT",
         desc:"Verification Existence Compte MaxIT",
         app:"MAXIT",
         date:"2023-10-12"
    },
    // {
    //     id:8,
    //     libelle:"Creation Compte Externe en masse",
    //     desc:"Creation Compte Externe en masse",
    //     app:"Active Directory",
    //     date:"2023-09-22"
    // },
    // {
    //     id:9,
    //     libelle:"Verif Existence Compte",
    //     desc:"Verif Existence Compte user",
    //     app:"SIMPLISSIMO",
    //     date:"2023-08-17"
    // },
    // {
    //     id:10,
    //     libelle:"Collecte Last Users Connexion",
    //     desc:"Collecte Last Users Connexion pour les applications GAIA - SIMPLISSIMO - NESSICO - KIBARU - BANDEAU - ORACLE",
    //     app:"SECIRUTE",
    //     date:"2023-04-06"
    // },
    // {
    //     id:11,
    //     libelle:"Export Parc Client Actif",
    //     desc:"Export Parc Client Actif",
    //     app:"SELFCAREB2B",
    //     date:"2022-12-13"
    // }, 
    // {
    //     id:12,
    //     libelle:"Masse GetInfoIN",
    //     desc:"Extraction des infos HLR et IN",
    //     app:"PRONETWORK	",
    //     date:"2022-12-13"
    // }
]
export {taches,data,columns}