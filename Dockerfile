# Usar imagem oficial do PHP com Apache
FROM php:8.2-apache

# Instalar dependências
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copiar os arquivos do projeto
COPY . /var/www/html

WORKDIR /var/www/html

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar dependências Laravel
RUN composer install --no-dev --optimize-autoloader

# Corrigir permissões
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Configuração do Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN a2enmod rewrite

# Definir variável de ambiente da porta
ENV PORT=8080
EXPOSE 8080

# Iniciar Laravel usando a porta do Render
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
