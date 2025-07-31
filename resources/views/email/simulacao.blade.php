<!DOCTYPE html>
<html>
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
            background-color: #0A8D48;
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 30px 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 25px;
            background-color: #0A8D48;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            font-size: 13px;
            color: #999;
            text-align: center;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🎉 Obrigado por realizar a simulação do seguro!</h1>
        </div>
        <div class="content">
            <p>Olá {{ $user->nome ?? 'usuário' }},</p>
            <p>
                Bem-vindo à <strong>MediaSeg</strong>! Estamos felizes em ter você conosco.
                Agora você tem acesso a conteúdos exclusivos, novidades e muito mais.
            </p>
            <p>Clique no botão abaixo para começar:</p>
            <a href="{{'https://srv913277.hstgr.cloud/iniciar-sessao'}}" class="button">Explorar agora</a>
        </div>
        <div class="footer">
            Se você não se inscreveu, por favor ignore este e-mail.<br>
            &copy; {{ date('Y') }} [MediaSeg]. Todos os direitos reservados.
        </div>
    </div>
</body>
</html>
