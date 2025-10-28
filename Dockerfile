FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Habilitar mod_rewrite para Laravel
RUN a2enmod rewrite

# Copiar arquivos
COPY . /var/www/laravel

WORKDIR /var/www/laravel

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar dependências Laravel
RUN composer install --no-dev --optimize-autoloader

# Permissões corretas
RUN chown -R www-data:www-data /var/www/laravel/storage /var/www/laravel/bootstrap/cache

# Configurar o Apache
RUN echo '<VirtualHost *:${PORT}>\n\
    DocumentRoot /var/www/laravel/public\n\
    <Directory /var/www/laravel/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Corrigir aviso do ServerName
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Ajustar Apache para a porta do Render
RUN sed -i "s/Listen 80/Listen ${PORT}/" /etc/apache2/ports.conf
RUN sed -i "s/*:80/*:${PORT}/" /etc/apache2/sites-available/000-default.conf

EXPOSE ${PORT}

CMD ["apache2-foreground"]
