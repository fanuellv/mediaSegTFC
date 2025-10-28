# Usar a imagem oficial do PHP com extensões necessárias
FROM php:8.2-apache

# Instalar dependências do Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copiar os arquivos do projeto
COPY . /var/www/html

# Definir o diretório de trabalho
WORKDIR /var/www/html

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Corrigir permissões
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Configurar Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN a2enmod rewrite
COPY ./.htaccess /var/www/html/.htaccess

# Definir a porta dinamicamente via Render
ENV PORT=8080
EXPOSE 8080

# Rodar o Laravel na porta do Render
CMD php artisan serve --host=0.0.0.0 --port=$PORT
