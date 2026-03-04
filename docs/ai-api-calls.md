# Intégrations API IA (Claude, Ollama, LM Studio, DeepSeek, OpenAI, Gemini)

Ce guide donne des exemples d’appels API prêts à brancher dans ton application radio + régie.

## 1) Variables d’environnement

```bash
export OPENAI_API_KEY="..."
export ANTHROPIC_API_KEY="..."
export GEMINI_API_KEY="..."
export DEEPSEEK_API_KEY="..."
export OLLAMA_BASE_URL="http://localhost:11434"
export LMSTUDIO_BASE_URL="http://localhost:1234"
```

## 2) Exemples `curl` par fournisseur

### OpenAI

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "system", "content": "Tu aides une radio FM."},
      {"role": "user", "content": "Rédige un conducteur de 15 minutes."}
    ],
    "temperature": 0.4
  }'
```

### Claude (Anthropic)

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-latest",
    "max_tokens": 600,
    "system": "Tu aides une régie publicitaire radio.",
    "messages": [
      {"role": "user", "content": "Propose un script spot de 20 secondes pour un restaurant local."}
    ]
  }'
```

### Gemini

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "parts": [
          {"text": "Donne 3 idées de sondage auditeur pour une émission matinale."}
        ]
      }
    ]
  }'
```

### DeepSeek

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "system", "content": "Assistant rédaction radio."},
      {"role": "user", "content": "Rédige un texte teaser de 50 mots pour une émission sport."}
    ]
  }'
```

### Ollama (local)

```bash
curl "$OLLAMA_BASE_URL/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.1",
    "messages": [
      {"role": "user", "content": "Génère 5 relances commerciales pour des annonceurs inactifs."}
    ],
    "stream": false
  }'
```

### LM Studio (local, API compatible OpenAI)

```bash
curl "$LMSTUDIO_BASE_URL/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "local-model",
    "messages": [
      {"role": "user", "content": "Génère un conducteur d’antenne pour le drive de 18h."}
    ],
    "temperature": 0.7
  }'
```

## 3) Recommandation d’implémentation

- Créer un **service IA unifié** côté backend (`AiProviderService`) avec une route unique (`POST /ai/generate`).
- Paramètres communs : `provider`, `model`, `prompt`, `context`, `temperature`, `maxTokens`.
- Journaliser tous les appels (provider, coût estimé, latence, erreur).
- Prévoir un fallback : cloud (OpenAI/Claude/Gemini/DeepSeek) puis local (Ollama/LM Studio) en cas d’indisponibilité.

## 4) Cas d’usage radio + régie

- génération de scripts d’émission,
- variantes de spots publicitaires,
- résumés d’interviews,
- réponses semi-automatiques aux annonceurs,
- suggestions de programmation selon la tranche horaire.
