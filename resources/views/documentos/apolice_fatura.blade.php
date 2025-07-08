<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Apólice e Fatura</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 14px; }
        .cabecalho { text-align: center; margin-bottom: 20px; }
        .bloco { margin-bottom: 15px; }
        .bold { font-weight: bold; }
    </style>
</head>
<body>
    <div class="cabecalho">
        <h2>Contrato de Seguro & Fatura</h2>
        <p>Número da Apólice: <span class="bold">{{ $apolice->numero }}</span></p>
    </div>

    <div class="bloco">
        <p><span class="bold">Cliente:</span> {{ $apolice->cliente->nome }}</p>
        <p><span class="bold">Plano:</span> {{ $apolice->plano->nome }}</p>
        <p><span class="bold">Descrição:</span> {{ $apolice->plano->descricao }}</p>
    </div>

    <div class="bloco">
        <p><span class="bold">Início:</span> {{ \Carbon\Carbon::parse($apolice->data_inicio)->format('d/m/Y') }}</p>
        <p><span class="bold">Término:</span> {{ \Carbon\Carbon::parse($apolice->data_fim)->format('d/m/Y') }}</p>
    </div>

    <div class="bloco">
        <p><span class="bold">Valor Total:</span> Kz {{ number_format($apolice->valor_total, 2, ',', '.') }}</p>
    </div>

    <p style="margin-top: 30px; text-align: center;">Obrigado por confiar em nossa seguradora.</p>
</body>
</html>
