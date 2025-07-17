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

# Define o diretório público como DocumentRoot
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Define diretório de trabalho
WORKDIR /var/www/html

EXPOSE 80
