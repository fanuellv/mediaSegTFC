# Etapa 1 - PHP + Apache
FROM php:8.2-apache

# Instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip

# Ativar mod_rewrite do Apache
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Criar diretório de trabalho
WORKDIR /var/www/laravel

# Copiar o projeto Laravel
COPY . .

# Instalar dependências PHP do Laravel
RUN composer install --no-dev --optimize-autoloader

# Dar permissões corretas
RUN chown -R www-data:www-data /var/www/laravel/storage /var/www/laravel/bootstrap/cache

# ⚙️ Substituir configuração padrão do Apache
RUN rm -f /etc/apache2/sites-enabled/000-default.conf && \
    echo "<VirtualHost *:8080>\n\
    ServerName localhost\n\
    DocumentRoot /var/www/laravel/public\n\
    <Directory /var/www/laravel/public>\n\
        Options Indexes FollowSymLinks\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    ErrorLog /var/log/apache2/error.log\n\
    CustomLog /var/log/apache2/access.log combined\n\
</VirtualHost>" > /etc/apache2/sites-available/laravel.conf && \
    ln -s /etc/apache2/sites-available/laravel.conf /etc/apache2/sites-enabled/laravel.conf

# Garantir que o Apache use a porta 8080
EXPOSE 8080

# Iniciar o Apache
CMD ["apache2-foreground"]
