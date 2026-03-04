# Comment tester l'application (plan pratique)

> État actuel du dépôt : documentation produit. Il n'y a pas encore d'application exécutable dans ce repository.
> Ce guide décrit **comment tester dès que le socle technique est créé** (frontend + backend + DB).

## 1) Stratégie de test recommandée

- **Tests unitaires** : valider les règles métiers (conflits de créneaux, statuts campagnes, calcul factures).
- **Tests d'intégration** : valider API + base PostgreSQL (création annonceur, devis, planification spot).
- **Tests end-to-end (E2E)** : parcours utilisateur complets (devis signé → planification → preuve de diffusion).
- **Tests non-régression métier** : scénarios radio/régie critiques, rejoués à chaque release.

## 2) Jeux de données de test minimum

Créer des fixtures de base :

- 3 émissions (matinale, midi, drive)
- 2 animateurs
- 5 annonceurs
- 2 campagnes actives
- 20 spots répartis sur une semaine

Objectif : reproduire les cas réels et détecter rapidement les conflits de planning.

## 3) Checklist de validation MVP

### A. Planning FM + spots pub
- [ ] Créer une émission et un créneau horaire.
- [ ] Planifier un spot pub sur un créneau libre.
- [ ] Tenter un chevauchement volontaire et vérifier l'erreur de conflit.
- [ ] Vérifier la vue calendrier jour/semaine.

### B. CRM + devis/facturation
- [ ] Créer un annonceur et un contact.
- [ ] Générer un devis puis le convertir en facture.
- [ ] Enregistrer un paiement partiel et vérifier le solde.
- [ ] Déclencher une relance automatique sur facture en retard.

### C. Rapport de diffusion
- [ ] Simuler des événements de diffusion (`BroadcastEvent`).
- [ ] Générer un rapport PDF/CSV d'une campagne.
- [ ] Vérifier l'envoi automatique email annonceur.

## 4) Tests des intégrations IA (Claude, Ollama, LM Studio, DeepSeek, OpenAI, Gemini)

Pré-requis :
- définir les variables d'environnement dans `docs/ai-api-calls.md`.
- exécuter chaque `curl` pour vérifier :
  - code HTTP 200,
  - réponse textuelle exploitable,
  - latence acceptable (< 8s pour un prompt court).

Validation fonctionnelle minimale :
- [ ] génération d'un script d'émission,
- [ ] génération d'une relance annonceur,
- [ ] fallback sur un provider local si un provider cloud est indisponible.

## 5) Critères de "go live" (MVP)

- 0 conflit de créneau non détecté en test E2E.
- 100% des factures test générées correctement.
- 100% des campagnes test avec preuve de diffusion exportable.
- 95% des appels IA réussis sur une campagne de test (avec fallback actif).

## 6) Commandes type à prévoir (quand le code sera en place)

> Exemple cible (à adapter selon le stack final)

```bash
# backend
npm run test
npm run test:integration
npm run test:e2e

# frontend
npm run lint
npm run test

# qualité globale
npm run typecheck
```

Si tu veux, je peux ensuite te générer un **squelette technique initial** (Next.js + NestJS + PostgreSQL + Docker Compose) avec ces tests déjà câblés.

## 7) Test rapide navigateur (prototype actuel)

Le repository contient maintenant un prototype statique dans `app/`.

```bash
python3 -m http.server 8080 --directory app
```

Ensuite :
- ouvrir `http://localhost:8080`,
- créer 1 créneau FM + 1 spot PUB,
- tenter de recréer le même créneau et vérifier l'alerte de conflit,
- créer 1 annonceur,
- tester la simulation IA et vérifier l'affichage de la réponse.
