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

## Exemplo Completo

### HTML
```html
<!DOCTYPE html>
<html>
<head>
    <title>Dual List Example</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#congelamentoModal">
            Abrir Modal
        </button>
    </div>

    <script type="module">
        import { Modal } from './components/modal.js';

        // Configurar opções do dropdown
        const dropdownOptions = [
            { id: '2023/1', caption: '2023/1' },
            { id: '2023/2', caption: '2023/2' },
            { id: '2024/1', caption: '2024/1' },
            { id: '2024/2', caption: '2024/2' },
            { id: '2025/1', caption: '2025/1' }
        ];

        // Configurar itens da lista de origem
        const sourceItems = [
            { id: '8', caption: 'Panorama' },
            { id: '40', caption: 'Foco Agronegócios' },
            { id: '55', caption: 'Global' },
            { id: '63', caption: 'Agrícola Estrela' },
            { id: '110', caption: 'Juparanã' },
            { id: '1010', caption: 'Coopertradição' },
            { id: '1018', caption: 'Coprossel' },
            { id: '1019', caption: 'Coperboa' },
            { id: '1040', caption: 'Camisc' },
            { id: '1058', caption: 'Coperdia' },
            { id: '1061', caption: 'Cooperplan' },
            { id: '5002', caption: 'Sementes Maua' },
            { id: '5001', caption: 'Bela Sementes' },
            { id: '5003', caption: 'Sementes Agrosol' },
            { id: '5004', caption: 'Sementes Costa Beber' },
            { id: '5006', caption: 'Sementes Petrovina' },
            { id: '5007', caption: 'SEMENTES TRIUNFO' },
            { id: '5008', caption: 'SEMENTES TALISMA' },
            { id: '5010', caption: 'Sementes Butiá' },
            { id: '5011', caption: 'Sementes Giovelli' },
            { id: '5012', caption: 'Sementes Lagoa Bonita' },
            { id: '5013', caption: 'Cerrado de Cima' },
            { id: '5015', caption: 'BJ SEMENTES' },
            { id: '5016', caption: 'Sementes Valiosa' },
            { id: '5018', caption: 'Agro Rosso' },
            { id: '5020', caption: 'Cereal Ouro' },
            { id: '5057', caption: 'SEMENTES ELIANE' },
            { id: '5073', caption: 'SEMENTES TROPICAL' },
            { id: '5082', caption: 'CALUBA SEMENTES' },
            { id: '5107', caption: 'SEMENTES MANA' },
            { id: '5114', caption: 'CANASSA' }
        ];

        // Criar instância do modal com todas as customizações
        const modal = new Modal({
            id: 'congelamentoModal',
            title: 'Congelamento RCA SeedCare',
            dropdownDescription: 'Período do congelamento',
            dropdownOptions: dropdownOptions,
            searchPlaceholder: 'Filtrar sementeiros',
            sourceListTitle: 'Sementeiros disponíveis',
            targetListTitle: 'Sementeiros selecionados',
            sourceItems: sourceItems,
            itemsPerPage: 10,
            onConfirm: (selectedItems, selectedContext) => {
                console.log('Itens selecionados:', selectedItems);
                console.log('Período selecionado:', selectedContext);
            }
        });

        // Adicionar o modal ao DOM
        document.body.appendChild(modal.render());
    </script>
</body>
</html>
```

Este exemplo demonstra como criar uma tela completa com um modal personalizado usando o componente Dual List. O modal inclui:

- Um dropdown para seleção de período
- Uma barra de pesquisa para filtrar sementeiros
- Uma lista dupla com sementeiros disponíveis e selecionados
- Botões de confirmar e cancelar

O modal é aberto através de um botão na página principal e todas as customizações são passadas através do construtor do componente Modal.
