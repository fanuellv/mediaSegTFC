<?php

namespace Database\Seeders;

use App\Models\Playlist;
use Illuminate\Database\Seeder;

class PlaylistSeeder extends Seeder
{
    public function run(): void
    {
        Playlist::create([
            'nome' => 'Mundo dos Seguros',
            'descricao' => 'Nesta playlist, damos os primeiros passos no universo dos seguros. Aqui você vai entender o que é um seguro, por que ele é importante e quais são os tipos mais comuns no mercado. Abordamos desde os conceitos básicos, como prêmios e apólices, até a diferença entre seguro e assistência. Ideal para quem está começando do zero ou quer reforçar os fundamentos.

Conteúdos típicos:

O que é um seguro?

Como funcionam as seguradoras?

Tipos de seguros existentes

Por que contratar um seguro?

Mitos e verdades sobre o mercado de seguros',
            'autor' => 'Felícia Henriques',
            'url_videos' => [
                'https://youtu.be/MMMW88Bry_c?list=PL1B5WZj9xXe2k6mMrxgGxCp1hRKPHPVSp',
                'https://youtu.be/AIsJimtZ4lA?list=PL1B5WZj9xXe2k6mMrxgGxCp1hRKPHPVSp',
                'https://youtu.be/QfQJQRuYyAA?list=PL1B5WZj9xXe2k6mMrxgGxCp1hRKPHPVSp',
            ],
        ]);

        Playlist::create([
            'nome' => 'Vida Protegida',
            'descricao' => 'Esta playlist é dedicada exclusivamente aos seguros de vida. Você vai aprender como eles funcionam, quais são os diferentes tipos (temporário, vitalício, resgatável), quem deve contratar, e quais benefícios ele pode oferecer — não apenas em caso de falecimento, mas também em vida. Ideal para quem busca proteger sua família ou garantir um futuro mais seguro.

🔹 Conteúdos típicos:

O que cobre um seguro de vida?

Diferença entre seguro de vida e plano funeral

Seguro de vida com cobertura em vida

Beneficiários: quem indicar?

Seguro de vida empresarial',

            'autor' => 'Primo Pobre, Bruno Perini',
            'url_videos' => [
                'https://youtu.be/mvBlcE3knhI',
                'https://youtu.be/s4BwNdzHh5s',
            ],
        ]);

        Playlist::create([
            'nome' => 'Seguro no Volante',
            'descricao' => 'Aqui você vai entender tudo sobre seguros automóveis. Desde como cotar corretamente, escolher coberturas ideais, evitar armadilhas e garantir proteção completa contra roubo, acidente, danos a terceiros e muito mais. Indispensável para quem dirige ou está pensando em proteger seu veículo.

🔹 Conteúdos típicos:

Seguro obrigatório vs. seguro facultativo

Como funciona a franquia

Dicas para pagar menos no seguro

O que fazer após um sinistro

Como funciona o seguro para carros financiados',
            'autor' => 'Júlio César, Yuri Hudson, Raul Sena',
            'url_videos' => [
                'https://www.youtube.com/watch?v=zQi91mYWQbc&pp=ygURc2VndXJvIGF1dG9tw7N2ZWw%3D',
                'https://www.youtube.com/watch?v=yp9VQnMSWWA&pp=ygURc2VndXJvIGF1dG9tw7N2ZWw%3D',
                'https://www.youtube.com/watch?v=3I3WS3x4_Ss&t=62s&pp=ygURc2VndXJvIGF1dG9tw7N2ZWw%3D',
            ],
        ]);

        Playlist::create([
            'nome' => 'Casa Segura',
            'descricao' => 'Nesta playlist, o foco está nos seguros patrimoniais, com ênfase em seguros residenciais. Aprenda como proteger seu lar contra incêndios, inundações, furtos e outros imprevistos. Vamos também abordar seguros para imóveis alugados, condomínios e comércios.

🔹 Conteúdos típicos:

Seguro residencial vale a pena?

O que cobre um seguro de casa

Como acionar o seguro após um sinistro

Seguro para inquilinos: como funciona

Seguro de bens móveis (eletrodomésticos, móveis, etc.)',
            'autor' => 'Canal Seguros',
            'url_videos' => [
                'https://www.youtube.com/watch?v=Cf5HvNn2zME&pp=ygULc2VndXJvIGNhc2E%3D',
                'https://www.youtube.com/watch?v=280iRkuq7Z0&pp=ygULc2VndXJvIGNhc2E%3D',
                'https://www.youtube.com/watch?v=Wz8qCwP_zcY&pp=ygULc2VndXJvIGNhc2E%3D',
            ],
        ]);

    }
}
