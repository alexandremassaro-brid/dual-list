# Componente Modal

Um componente JavaScript que implementa um modal de diálogo com recursos de filtragem, paginação e transferência de itens entre listas. Construído com JavaScript puro e estilização do Bootstrap 3.3.7.

## Funcionalidades

- Modal de diálogo com título, corpo e rodapé
- Dropdown para seleção de contexto
- Campo de busca para filtrar itens
- Lista dupla para transferência de itens
- Paginação integrada
- Callbacks para eventos de confirmação, cancelamento e transferência
- Atualização dinâmica do conteúdo

## Instalação

1. Inclua o CSS do Bootstrap 3.3.7 em seu projeto:
```html
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
```

2. Inclua o jQuery para funcionalidades do Bootstrap:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"></script>
```

3. Importe o componente Modal:
```javascript
import { Modal } from './components/modal.js';
```

## Exemplos de Uso

### Criando um Modal Básico

```javascript
// Configurar opções do dropdown
const dropdownOptions = [
    { id: '2023', caption: 'Ano 2023' },
    { id: '2024', caption: 'Ano 2024' }
];

// Configurar itens da lista de origem
const sourceItems = [
    { id: '1', caption: 'Item 1' },
    { id: '2', caption: 'Item 2' },
    { id: '3', caption: 'Item 3' }
];

// Criar instância do modal com configurações básicas
const modal = new Modal({
    id: 'selecaoModal',
    title: 'Seleção de Itens',
    dropdownDescription: 'Selecione um período',
    dropdownOptions: dropdownOptions,
    searchPlaceholder: 'Filtrar itens...',
    sourceListTitle: 'Itens disponíveis',
    targetListTitle: 'Itens selecionados',
    sourceItems: sourceItems,
    targetItems: [],
    itemsPerPage: 5,
    cancelButtonLabel: 'Cancelar',
    confirmButtonLabel: 'Confirmar',
    onCancel: () => console.log('Operação cancelada'),
    onConfirm: (selectedItems, selectedContext) => {
        // Validações
        if (!selectedContext) {
            alert('Por favor, selecione um período');
            return;
        }

        if (selectedItems.length === 0) {
            alert('Por favor, selecione pelo menos um item');
            return;
        }

        // Processar os dados selecionados
        console.log('Período selecionado:', selectedContext);
        console.log('Itens selecionados:', selectedItems);

        // Fechar o modal após processamento
        $('#selecaoModal').modal('hide');
    }
});

// Adicionar o modal ao DOM
document.body.appendChild(modal.render());

// Abrir o modal (requer Bootstrap JS)
$('#selecaoModal').modal('show');
```

### Configurando Callbacks para Eventos de Transferência

```javascript
// Função de callback para eventos de transferência
const onTransfer = (transferType) => {
    console.log(`Tipo de transferência: ${transferType}`);

    // Possíveis valores de transferType:
    // 'allToDestination' - Todos os itens movidos para o destino
    // 'selectedToDestination' - Itens selecionados movidos para o destino
    // 'selectedToSource' - Itens selecionados movidos para a origem
    // 'allToSource' - Todos os itens movidos para a origem
};

// Criar instância do modal com callback de transferência
const modal = new Modal({
    id: 'selecaoModal',
    title: 'Seleção de Itens',
    dropdownDescription: 'Selecione um período',
    dropdownOptions: dropdownOptions,
    searchPlaceholder: 'Filtrar itens...',
    sourceListTitle: 'Itens disponíveis',
    targetListTitle: 'Itens selecionados',
    sourceItems: sourceItems,
    targetItems: [],
    itemsPerPage: 5,
    cancelButtonLabel: 'Cancelar',
    confirmButtonLabel: 'Confirmar',
    onCancel: () => console.log('Operação cancelada'),
    onConfirm: (selectedItems, selectedContext) => {
        // Validações
        if (!selectedContext) {
            alert('Por favor, selecione um período');
            return;
        }

        if (selectedItems.length === 0) {
            alert('Por favor, selecione pelo menos um item');
            return;
        }

        // Processar os dados selecionados
        console.log('Período selecionado:', selectedContext);
        console.log('Itens selecionados:', selectedItems);

        // Fechar o modal após processamento
        $('#selecaoModal').modal('hide');
    },
    onTransfer: onTransfer
});
```

### Filtragem de Itens

O modal possui funcionalidade integrada de filtragem que pode ser usada para pesquisar itens nas listas.

```javascript
// Filtrar itens nas listas
modal.filter('termo de busca');

// Exemplo: conectar um campo de texto para filtragem
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (event) => {
    modal.filter(event.target.value.toLowerCase());
});
```

### Customização da Paginação

O modal permite customização avançada da paginação através do parâmetro `paginationOptions`.

```javascript
// Configurações avançadas de paginação
const paginationOptions = {
    maxPageButtons: 4,              // Número máximo de botões de página
    alwaysShowNavButtons: true,     // Sempre mostrar botões de navegação (anterior/próximo)
    alwaysShowEdgeButtons: true     // Sempre mostrar botões de extremidade (primeira/última página)
};

// Criar instância do modal com opções de paginação personalizadas
const modal = new Modal({
    id: 'selecaoModal',
    title: 'Seleção de Itens',
    dropdownDescription: 'Selecione um período',
    dropdownOptions: dropdownOptions,
    searchPlaceholder: 'Filtrar itens...',
    sourceListTitle: 'Itens disponíveis',
    targetListTitle: 'Itens selecionados',
    sourceItems: sourceItems,
    targetItems: [],
    itemsPerPage: 10,
    cancelButtonLabel: 'Cancelar',
    confirmButtonLabel: 'Confirmar',
    onCancel: () => console.log('Operação cancelada'),
    onConfirm: (selectedItems, selectedContext) => {
        // Validações
        if (!selectedContext) {
            alert('Por favor, selecione um período');
            return;
        }

        if (selectedItems.length === 0) {
            alert('Por favor, selecione pelo menos um item');
            return;
        }

        // Processar os dados selecionados
        console.log('Período selecionado:', selectedContext);
        console.log('Itens selecionados:', selectedItems);

        // Fechar o modal após processamento
        $('#selecaoModal').modal('hide');
    },
    paginationOptions: paginationOptions
});
```

### Atualizando Dinamicamente o Conteúdo do Modal

É possível atualizar dinamicamente o conteúdo do modal após sua criação.

```javascript
// Atualizar as listas do modal
const novosItensOrigem = [
    { id: '4', caption: 'Item 4' },
    { id: '5', caption: 'Item 5' }
];

const novosItensDestino = [
    { id: '1', caption: 'Item 1' },
    { id: '2', caption: 'Item 2' }
];

// Atualizar dual list dentro do modal
modal.updateDualList(novosItensOrigem, novosItensDestino, 8);
```

## Referência da API

### Classe Modal

- `Modal`: Classe principal do componente modal

### Opções do Modal

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `id` | string | 'dialogModal' | ID do elemento modal |
| `title` | string | 'Dialog Modal' | Título do modal |
| `dropdownDescription` | string | 'Selecione uma opção' | Texto descritivo do dropdown |
| `dropdownOptions` | array | [] | Opções disponíveis no dropdown |
| `searchPlaceholder` | string | 'Buscar...' | Placeholder do campo de busca |
| `sourceListTitle` | string | 'Source List' | Título da lista de origem |
| `targetListTitle` | string | 'Target List' | Título da lista de destino |
| `sourceItems` | array | [] | Itens iniciais da lista de origem |
| `targetItems` | array | [] | Itens iniciais da lista de destino |
| `itemsPerPage` | number | 5 | Itens por página nas listas |
| `cancelButtonLabel` | string | 'Cancelar' | Texto do botão cancelar |
| `confirmButtonLabel` | string | 'Confirmar' | Texto do botão confirmar |
| `onCancel` | function | - | Callback quando cancelar é clicado |
| `onConfirm` | function | - | Callback quando confirmar é clicado |
| `onTransfer` | function | - | Callback quando itens são transferidos |
| `paginationOptions` | object | {} | Opções de paginação |

## Suporte a Navegadores

Suporta todos os navegadores compatíveis com Bootstrap 3.3.7.

## Exemplo Completo

### HTML
```html
<!DOCTYPE html>
<html>
<head>
    <title>Modal Example</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#congelamentoModal">
            Abrir Modal
        </button>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"></script>
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
            { id: '1058', caption: 'Coperdia' }
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
                // Validações
                if (!selectedContext) {
                    alert('Por favor, selecione um período');
                    return;
                }

                if (selectedItems.length === 0) {
                    alert('Por favor, selecione pelo menos um sementeiro');
                    return;
                }

                // Processar os dados selecionados
                console.log('Período selecionado:', selectedContext);
                console.log('Sementeiros selecionados:', selectedItems);

                // Fechar o modal após processamento
                $('#congelamentoModal').modal('hide');
            }
        });

        // Adicionar o modal ao DOM
        document.body.appendChild(modal.render());
    </script>
</body>
</html>
```

Este exemplo demonstra como criar uma tela completa com um modal personalizado usando o componente Modal. O modal inclui:

- Um dropdown para seleção de período
- Uma barra de pesquisa para filtrar sementeiros
- Uma lista dupla com sementeiros disponíveis e selecionados
- Botões de confirmar e cancelar

O modal é aberto através de um botão na página principal e todas as customizações são passadas através do construtor do componente Modal.
