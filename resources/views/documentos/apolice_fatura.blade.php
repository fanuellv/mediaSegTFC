<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <title>Certificado Provisório de Seguro</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 9px;
            margin: 0px;
        }

        .bold {
            font-weight: bold;
        }

        .linha {
            border-top: 1px solid #ccc;
            margin: 0;
        }

        .linha-traco {
            border-top: 1px dashed #999;
            margin: 0;
        }


        .secao {
            margin-bottom: 15px;
        }

        .menor {
            font-size: 9px;
            color: #555;
        }

        .borda {
            background-color: bg-[#0153A5];
            border: 1px solid bg-[#0153A5];
            border-radius: 6px;
            padding: 4px 8px;
            margin-bottom: 4px;
            color: #0000;
        }

        table {
            //border-collapse: collapse;
            width: 100%;
            margin-bottom: 12px;
        }

        td {
            vertical-align: top;
            padding: 4px 6px;
        }

        .caixa-info {
            border: 1px solid #999;
            border-radius: 10px;
            padding: 6px;
            margin-top: 15px;
        }

        .tabela-info td {
            padding: 6px;
            border-bottom: 1px solid #ddd;
        }

        .tabela-info tr:last-child td {
            border-bottom: none;
        }
    </style>
</head>

<body>
    @php
        $logoPath = public_path('/img/LogomediaSeg.png');
        $logoBase64 = base64_encode(file_get_contents($logoPath));

        $fotoSeguradora = $plano_seguro->seguradora->foto ?? null;
        $fotoSeguradoraBase64 = null;

        if ($fotoSeguradora && file_exists(public_path("storage/{$fotoSeguradora}"))) {
            $fotoSeguradoraBase64 = base64_encode(file_get_contents(public_path("storage/{$fotoSeguradora}")));
        }
    @endphp

    <table>
        <tr>
            <td><img src="data:image/png;base64,{{ $logoBase64 }}" height="60" alt="Logo"></td>
            <td style="text-align: right;"><span class="bold" style="font-size: 14px;">Certificado Provisório de
                    Seguro</span></td>
        </tr>
    </table>

    <div class="">
        <table>
            <tr>
                <td>
                    <p><span class="borda">Dados do Cliente</span></p>
                    <p><span class="bold">Cliente:</span> {{ $apolice->cliente->nome ?? '---' }}
                        {{ $apolice->cliente->sobrenome ?? '' }}</p>
                    <p><span class="bold">Nº Contribuinte:</span> {{ $apolice->cliente->nif ?? '---' }}</p>
                    <p><span class="bold">Nº Cliente:</span> {{ $apolice->cliente->id ?? '---' }}</p>
                </td>
            </tr>
        </table>
    </div>

    <div class="">

        <table>
            <tr>

                <td>

                    <div>
                        <p><span class="borda">Dados do Documento</span></p>
                        <p><span class="bold">Nº Apólice:</span> {{ $apolice->id ?? '---' }}</p>
                        <p><span class="bold">Data de Emissão:</span>
                            {{ \Carbon\Carbon::parse($apolice->created_at ?? now())->format('d/m/Y') }}</p>
                        <p><span class="bold">Período:</span>
                            {{ \Carbon\Carbon::parse($apolice->data_inicio)->format('d/m/Y') }} a
                            {{ \Carbon\Carbon::parse($apolice->data_fim)->format('d/m/Y') }}</p>
                        <p><span class="bold">Fracionamento:</span> Trimestral</p>
                        <p><span class="bold">Nº Fatura/Recibo:</span> {{ $apolice->id ?? '---' }}</p>
                    </div>
                </td>
                <td style="text-align: right;">
                    <p class="bold">MediaSeg</p>
                    <p>Rua das Acácias, Nº 215, Bairro Nova Esperança, Talatona, Luanda</p>
                </td>
            </tr>
        </table>
    </div>

    {{-- Até aqui exporta --}}

    <div class="caixa-info" style="font-size: 9px;">
        @switch(strtolower($plano_seguro->tipo->nome))
            @case('automovel')
                <div style="white-space: pre-wrap;">
                    Caro (a) Cliente,<br>
                    Para circular em segurança, emitimos a fatura e o <strong>Certificado Provisório de Seguro</strong>, que
                    deve acompanhar até o recebimento da <strong>Carta Verde</strong>.<br><br>
                    Em caso de dúvidas:<br>
                    - Linha Cliente: 940125778 (dias úteis das 9h às 21h)<br>
                    - Email: mediaseg.ao@gmail.com<br>
                    - Área do Cliente na plataforma<br><br>
                    Desejamos-lhe uma boa experiência de seguro!
                </div>
            @break

            @case('vida')
                <pre style="white-space: pre-wrap;">
Caro (a) Cliente,

Obrigado por escolher a MediaSeg para proteger o seu futuro. A sua apólice de Seguro de Vida está ativa durante o período contratado.

Dúvidas? Fale connosco:
- Linha Cliente: 940125778 (dias úteis das 9h às 21h)
- Email: mediaseg.ao@gmail.com
- Área do Cliente na plataforma

Conte com a MediaSeg para o seu bem-estar.
</pre>
            @break

            @case('saude')
                <pre style="white-space: pre-wrap;">
Caro (a) Cliente,

Obrigado por confiar na MediaSeg para proteger a sua saúde. O seu plano está ativo e com acesso garantido aos serviços contratados.

Em caso de necessidade:
- Linha Cliente: 940125778 (dias úteis das 9h às 21h)
- Email: mediaseg.ao@gmail.com
- Área do Cliente na plataforma

Desejamos-lhe saúde e tranquilidade.
</pre>
            @break

            @default
                <p>Tipo de seguro não especificado.</p>
        @endswitch
    </div>

    <table class="caixa-info">
        <tr class="bold">
            <td>Produto</td>
            <td>Objeto Seguro</td>
            <td>Total</td>
        </tr>
        <tr>
            <td>{{ ucfirst($plano_seguro->tipo->nome) ?? '---' }}</td>
            <td>
                @switch(strtolower($plano_seguro->tipo->nome))
                    @case('automovel')
                        <div>
                            Automovel
                        </div>
                    @break

                    @case('saude')
                        <div>
                            Saude
                        </div>
                    @break

                    @case('vida')
                        <div>
                            vida
                        </div>
                    @break

                    @default
                        <p>Tipo de seguro não especificado.</p>
                @endswitch

            </td>
            <td>Kz {{ number_format((float) $apolice->valor_calculado, 2, ',', '.') }}</td>

            </td>
        </tr>
    </table>

    <div class="linha-traco"></div>


    <table style="border: 1px">
        <tr>
            <td width="40%">
                @if ($fotoSeguradoraBase64)
                    <img src="data:image/png;base64,{{ $fotoSeguradoraBase64 }}" alt="logo da seguradora"
                        height="60">
                @else
                    <img src="data:image/png;base64,{{ $logoBase64 }}" alt="logo da seguradora" height="60">
                @endif

            </td>
            <td class="left">
                <p class="bold">CERTIFICADO PROVISÓRIO DE SEGURO</p>
                <p style="font-size: 5px;">(substitui a carta verde no período indicado)</p>
            </td>
        </tr>
        <tr>
            <td>
                @switch(strtolower($plano_seguro->tipo->nome))
                    @case('automovel')
                    <p><span class="bold">Beneficiário: {{$apolice->cliente->nome}}{{' '}}{{$apolice->cliente->sobrenome}}</span></p>
                        <p><span class="bold">Marca/Modelo:</span> {{ $apolice->veiculo->marca ?? '---' }}
                            {{ $apolice->veiculo->modelo ?? '---' }}</p>
                        <p><span class="bold">Matrícula:</span> {{ $apolice->veiculo->matricula ?? '---' }}</p>
                        <p><span class="bold">Tipo de Uso:</span> {{ $apolice->tipo_uso ?? '---' }}</p>
                        <p><span class="bold">Franquia:</span> {{ $apolice->tem_franquia ? 'Sim' : 'Não' }}</p>
                        <p><span class="bold">Ano do Veículo:</span> {{ $apolice->ano_veiculo ?? '---' }}</p>
                    @break

                    @case('vida')
                    <p><span class="bold">Beneficiário: {{$apolice->cliente->nome}}{{' '}}{{$apolice->cliente->sobrenome}}</span></p>
                    <p><span class="bold">Idade:</span>
                        {{
                            \Carbon\Carbon::parse($apolice->cliente->dataRegistro)->age
                        }} anos
                    </p>
                    
                    
                        <p><span class="bold">Profissão:</span> {{ ucfirst($apolice->profissao ?? '---') }}</p>
                        <p><span class="bold">Fumante:</span> {{ $apolice->fumante ? 'Sim' : 'Não' }}</p>
                    @break

                    @case('saude')
                    <p><span class="bold">Beneficiário: {{$apolice->cliente->nome}}{{' '}}{{$apolice->cliente->sobrenome}}</span></p>
                    <p><span class="bold">Idade:</span>
                        {{
                            \Carbon\Carbon::parse($apolice->cliente->dataRegistro)->age
                        }} anos
                    </p>
                        <p><span class="bold">Descrição Plano:</span> {{ $plano_seguro->descricao ?? '---' }}</p>
                    @break
                @endswitch
            </td>
            <td style="border: 1px">
                <p><span class="bold">Plano: {{ $plano_seguro->nome ?? '---' }}</span></p>
                <p><span class="bold">Cobertura: {{ $plano_seguro->cobertura ?? '---' }}</span></p>
                <p><span class="bold">Válido de:</span>
                    {{ \Carbon\Carbon::parse($apolice->data_inicio)->format('d/m/Y') }} até
                    {{ \Carbon\Carbon::parse($apolice->data_fim)->format('d/m/Y') }}</p>
            </td>
        </tr>
    </table>

    <table class="menor" width="100%">
        <tr>
            <td>
                <p>Linha Cliente:
                    {{ $plano_seguro->seguradora->nome ?? '---' }}{{ ' Contacto telefónico ' }}{{ $plano_seguro->seguradora->telefone ?? '---' }}
                </p>
                <p>Email: {{ $plano_seguro->seguradora->email ?? '---' }}</p>
                <p>Localização: {{ $plano_seguro->seguradora->endereco ?? '---' }}</p>
            </td>
        </tr>
    </table>

    <div style="text-align: center; margin-top: 30px;">
        <p>MediaSeg - Seguros que cuidam Soluções que protegem.</p>
    </div>
</body>

</html>
