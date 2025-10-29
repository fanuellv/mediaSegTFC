# Etapa 1: imagem base PHP com Apache
FROM php:8.2-apache

# Instala extensões PHP necessárias para Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    unzip \
    curl \
    libonig-dev \
    libxml2-dev && \
    docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Habilita módulos do Apache necessários
RUN a2enmod rewrite

# Define o diretório de trabalho correto
WORKDIR /var/www/laravel

# Copia os arquivos do Laravel para dentro do container
COPY . .

# Instala dependências do Laravel
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer && \
    composer install --no-dev --optimize-autoloader

# Ajusta permissões
RUN chown -R www-data:www-data storage bootstrap/cache

# Configura o VirtualHost
RUN rm -f /etc/apache2/sites-enabled/000-default.conf && \
    echo "<VirtualHost *:8080>
    ServerName localhost
    DocumentRoot /var/www/laravel/public
    <Directory /var/www/laravel/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog /var/log/apache2/error.log
    CustomLog /var/log/apache2/access.log combined
</VirtualHost>" > /etc/apache2/sites-available/laravel.conf && \
    ln -s /etc/apache2/sites-available/laravel.conf /etc/apache2/sites-enabled/laravel.conf

# Expõe a porta usada pelo Render
EXPOSE 8080

# Inicia o Apache
CMD ["apache2-foreground"]
