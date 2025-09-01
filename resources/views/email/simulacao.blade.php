<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Bem-vindo à MediaSeg</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            background-color: #ffffff;
            margin: 40px auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #0153A5;
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px 20px;
            text-align: left;
        }
        .content p {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
            margin: 10px 0;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #0153A5;
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            font-size: 13px;
            color: #999;
            text-align: center;
            padding: 20px;
            background: #f9f9f9;
        }
        .bold {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Obrigado por realizar a simulação do seguro!</h1>
        </div>

        <div class="content">
            <p>Olá <strong>{{ $user->nome ?? 'Usuário' }}</strong>,</p>
            <p>A sua simulação foi realizada com sucesso</p>

            <h3>📋 Dados do Cliente</h3>
            <p><span class="bold">Cliente:</span> {{ $apolice->cliente->nome ?? '---' }} {{ $apolice->cliente->sobrenome ?? '' }}</p>
            <p><span class="bold">Nº Contribuinte:</span> {{ $apolice->cliente->nif ?? '---' }}</p>
            <p><span class="bold">Nº Cliente:</span> {{ $apolice->cliente->id ?? '---' }}</p>

            <h3>Plano Escolhido</h3>
            <p><span class="bold">Tipo:</span> {{ ucfirst($apolice->plano->nome ?? '---') }}</p>
            <p><span class="bold">Valor Calculado:</span> Kz {{ number_format((float) $apolice->valor_total, 2, ',', '.') }}</p>

            <p>Clique no botão abaixo para explorar:</p>
            <a href="{{ url('https://srv913277.hstgr.cloud/iniciar-sessao') }}" class="button">Explorar Agora</a>
        </div>

        <div class="footer">
            Se você não solicitou esta simulação, por favor ignore este e-mail.<br>
            &copy; {{ date('Y') }} MediaSeg. Todos os direitos reservados.
        </div>
    </div>
</body>
</html>
