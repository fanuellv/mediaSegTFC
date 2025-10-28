# Usa imagem oficial PHP com Apache
FROM php:8.2-apache

# Instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Habilitar mod_rewrite para Laravel
RUN a2enmod rewrite

# Configurar o Apache para usar o diretório público do Laravel
COPY ./public /var/www/html
COPY . /var/www/laravel

WORKDIR /var/www/laravel

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar dependências Laravel
RUN composer install --no-dev --optimize-autoloader

# Dar permissões corretas
RUN chown -R www-data:www-data /var/www/laravel/storage /var/www/laravel/bootstrap/cache

# Configurar Apache para apontar para /var/www/laravel/public
RUN echo '<VirtualHost *:80>\n\
    DocumentRoot /var/www/laravel/public\n\
    <Directory /var/www/laravel/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Expor a porta padrão do Apache
EXPOSE 80

# Iniciar Apache (sem artisan serve)
CMD ["apache2-foreground"]
