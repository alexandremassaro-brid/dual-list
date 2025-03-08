# Componente Dual List

Um componente JavaScript que implementa uma interface de lista dupla com recursos de filtragem e transferência entre listas de origem e destino. Construído com JavaScript puro e estilização do Bootstrap 3.3.7.

## Funcionalidades

- Funcionalidade de transferência bidirecional
- Itens estilizados com Bootstrap 3.3.7
- Múltiplos tipos de itens de lista:
  - Itens de lista não ordenada
  - Itens com link (tags anchor)
  - Itens com botão
- Estilos de contexto para itens:
  - Sucesso
  - Perigo
  - Alerta
  - Informação
- Capacidade de filtragem de itens
- Funcionalidade de seleção/desseleção
- Gerenciamento de estado ativo e desativado
- Set especializado para gerenciamento de itens
- Suporte a iteração e filtragem de itens
- Gerenciamento de estado de seleção

## Instalação

1. Inclua o CSS do Bootstrap 3.3.7 em seu projeto:
```html
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
```

2. Importe o componente:
```javascript
import { DualList, types, ListItem, List } from './lists.js';
```

## Como Usar

### Criando uma lista dupla básica

```javascript
// Crie as listas de origem e destino
const listaOrigem = new List([
    ['1', 'Item 1'],
    ['2', 'Item 2'],
    ['3', 'Item 3']
]);

const listaDestino = new List();

// Inicialize a lista dupla
const listaDupla = new DualList(listaOrigem, listaDestino);
```

### Diferentes Tipos de Itens de Lista

```javascript
// Crie uma lista com itens linkados
const listaComLinks = new List([], types.LINKED_ITEMS);

// Crie uma lista com itens de botão
const listaComBotoes = new List([], types.BUTTON_ITEMS);
```

### Criando Itens Individuais

```javascript
// Criar um item com contexto
const item = new ListItem('1', 'Item 1', ListItem.contexts.SUCCESS);

// Habilitar/Desabilitar item
item.disable();
item.enable();
item.toggleDisabled();

// Selecionar/Desselecionar item
item.select();
item.deselect();
item.toggleSelected();
```

### Filtrando Itens

```javascript
// Filtrar itens da lista de origem
const itensFiltrados = listaDupla.filterSourceList('termo de busca');

// Filtrar itens da lista de destino
const itensDestinoFiltrados = listaDupla.filterTargetList('termo de busca');
```

### Movendo Itens Entre Listas

```javascript
// Mover item da origem para o destino
listaDupla.moveFromSourceToTarget(item);

// Mover item do destino para a origem
listaDupla.moveFromTargetToSource(item);

// Limpar listas
listaDupla.clearSourceList();
listaDupla.clearTargetList();
listaDupla.clearLists();
```

## Referência da API

### Classes

- `DualList`: Classe principal do componente
- `List`: Contêiner de lista única
- `ListItem`: Item individual da lista
- `ListItemSet`: Set especializado para gerenciar ListItems

### Tipos de Item

```javascript
types.UNORDERED    // Itens de lista regular
types.LINKED_ITEMS // Itens com link
types.BUTTON_ITEMS // Itens com botão
```

### Contextos de Item

```javascript
ListItem.contexts.NONE    // Estilo padrão
ListItem.contexts.SUCCESS // Estilo de sucesso
ListItem.contexts.DANGER  // Estilo de perigo
ListItem.contexts.WARNING // Estilo de alerta
ListItem.contexts.INFO    // Estilo de informação
```

## Suporte a Navegadores

Suporta todos os navegadores compatíveis com Bootstrap 3.3.7.
