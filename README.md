# Radio Datas

Plan produit pour construire une application unifiée **Radio FM + Régie publicitaire** avec un démarrage orienté impact business rapide.

## 1) Vision

Créer une plateforme unique qui permet de :
- piloter la grille FM (émissions, animateurs, musique, jingles) ;
- vendre et diffuser des campagnes publicitaires sans conflit de créneau ;
- automatiser la facturation et les preuves de diffusion ;
- suivre la performance radio et commerciale dans un seul tableau de bord.

---

## 2) MVP recommandé (12 semaines)

### Lot A — Planning FM + Spots pub (semaines 1 à 4)
**Objectif :** éviter les collisions de créneaux et centraliser l’exploitation quotidienne.

Fonctionnalités :
- calendrier de grille horaire (jour/semaine),
- gestion des émissions (titre, format, animateur, durée),
- planning des spots pub (campagne, client, fréquence, horaires),
- détection de conflits automatique,
- vue régie “on air” simplifiée.

**KPI de succès :**
- 0 double réservation de créneau,
- réduction du temps de planification hebdo de 30%.

### Lot B — CRM annonceurs + Devis/Facturation (semaines 5 à 8)
**Objectif :** sécuriser le chiffre d’affaires.

Fonctionnalités :
- fiches annonceurs et contacts,
- pipeline commercial (prospect → devis → signé),
- génération devis/facture PDF,
- suivi paiements + relances automatiques,
- historique des contrats.

**KPI de succès :**
- délai devis réduit de 50%,
- taux de factures en retard en baisse de 20%.

### Lot C — Rapport de diffusion automatique (semaines 9 à 12)
**Objectif :** renforcer la confiance annonceurs.

Fonctionnalités :
- journal horodaté des diffusions,
- rapprochement campagne vs diffusions réelles,
- export PDF/CSV par campagne,
- envoi email automatique des preuves de passage.

**KPI de succès :**
- 100% des campagnes avec preuve envoyée,
- baisse des litiges de diffusion.

---

## 3) Modules phase 2

### Radio FM
- bibliothèque musicale (métadonnées, droits SACEM),
- scriptwriting collaboratif animateurs/producteurs,
- dashboard de monitoring technique (signal, alertes),
- gestion des jingles/habillages,
- SMS/dédicaces + modération,
- sondages & votes en direct.

### Régie pub
- workflow de production des spots (brief → validation → diffusion),
- portail client de validation des maquettes,
- dashboards commerciaux (CA, renouvellement, performance client).

### Transversal
- RH/planning équipes,
- archivage audio cloud,
- comptabilité légère intégrée.

---

## 4) Architecture fonctionnelle proposée

### Rôles
- **Admin** : paramétrage global, droits, référentiels.
- **Programmateur radio** : grille, émissions, ressources antenne.
- **Régie pub/commercial** : CRM, contrats, campagnes.
- **Compta** : facturation, paiements, exports.
- **Technicien** : monitoring diffusion et incidents.

### Domaines métiers
- `radio_programming`
- `ad_sales_crm`
- `ad_campaign_scheduling`
- `broadcast_logs`
- `billing`
- `reporting`

### Entités clés
- `Show`, `Host`, `Timeslot`, `MusicTrack`, `Jingle`
- `Advertiser`, `Contact`, `Quote`, `Invoice`, `Payment`
- `Campaign`, `Spot`, `BookedSlot`, `BroadcastEvent`

---

## 5) Stack technique conseillée (pragmatique)

- **Frontend** : Next.js + TypeScript
- **Backend** : NestJS (ou Django) en API REST
- **Base de données** : PostgreSQL
- **Queue / jobs** : Redis + worker (emails, rapports)
- **Stockage fichiers audio** : S3 compatible
- **Auth** : Keycloak ou Auth0
- **Observabilité** : Grafana + Prometheus + Sentry

Pourquoi : stack standard, recrutement facile, montée en charge progressive, bonne séparation front/back.

---

## 6) Schéma de données minimum (MVP)

Tables prioritaires :
- `users`, `roles`
- `advertisers`, `contacts`
- `campaigns`, `spots`, `booked_slots`
- `shows`, `timeslots`
- `quotes`, `invoices`, `payments`
- `broadcast_events`

Règles métiers critiques :
- contrainte d’unicité de créneau pour éviter les collisions,
- statuts normalisés (`draft`, `validated`, `scheduled`, `aired`, `cancelled`),
- traçabilité complète (qui a planifié/modifié/validé).

---

## 7) Plan d’exécution immédiat (2 semaines)

1. **Atelier cadrage (2 jours)** : besoins, rôles, workflow actuel.
2. **Maquettes UI (3 jours)** : calendrier unifié radio/pub + CRM simple.
3. **Backlog priorisé (1 jour)** : découpage user stories.
4. **Sprint 1 (1 semaine)** : socle auth + gestion annonceurs + calendrier créneaux.
5. **Sprint 2 (1 semaine)** : devis/facture + logs diffusion basiques.

Livrables :
- prototype cliquable,
- API initiale,
- base PostgreSQL versionnée,
- premier rapport de diffusion exportable.

---

## 8) Priorité business recommandée

1. Planning grille + spots pub,
2. CRM annonceurs + facturation,
3. Rapport de diffusion automatique.

Cet ordre maximise le **gain opérationnel**, puis le **cashflow**, puis la **fidélisation annonceurs**.

---


## 9) Intégrations IA (Claude, Ollama, LM Studio, DeepSeek, OpenAI, Gemini)

Pour accélérer la production éditoriale et commerciale, j’ai ajouté un guide d’intégration API multi‑fournisseurs :

- Voir `docs/ai-api-calls.md` pour des exemples `curl` prêts à l’emploi.
- Fournisseurs couverts : **Claude, Ollama, LM Studio, DeepSeek, OpenAI, Gemini**.
- Recommandation : exposer une API interne unique `POST /ai/generate` avec routage par provider.


---


## 10) Comment tester l'appli ?

Un guide dédié est disponible ici : **`docs/testing.md`**.

Tu y trouveras :
- la stratégie de test (unitaires, intégration, E2E),
- une checklist MVP (planning, CRM/facturation, diffusion),
- la validation des appels IA (Claude, Ollama, LM Studio, DeepSeek, OpenAI, Gemini),
- les critères de go-live.

---


## 11) Télécharger l'app et tester sur ton navigateur

### Option A — Télécharger en ZIP
1. Télécharge le dépôt GitHub en ZIP.
2. Décompresse le dossier.
3. Ouvre un terminal dans le dossier du projet.
4. Lance un serveur web local :

```bash
python3 -m http.server 8080 --directory app
```

5. Ouvre ton navigateur sur : `http://localhost:8080`

### Option B — Via Git

```bash
git clone <url-du-repo>
cd radio-datas
python3 -m http.server 8080 --directory app
```

Puis ouvre : `http://localhost:8080`

### Ce que tu peux tester immédiatement
- Ajout de créneaux FM/PUB,
- Ajout d'annonceurs (mini CRM),
- Simulation de réponse IA multi-provider.
