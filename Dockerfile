FROM php:8.2-apache

# Instala extensões necessárias
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    unzip \
    zip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql zip

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia os arquivos do projeto
COPY . /var/www/html/

# Ajusta permissões
RUN chown -R www-data:www-data /var/www/html

# Habilita mod_rewrite do Apache
RUN a2enmod rewrite

# Define diretório de trabalho
WORKDIR /var/www/html

# Porta do Laravel
EXPOSE 80
