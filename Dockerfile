FROM php:8.2-apache

# Instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip

# Ativar mod_rewrite
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Criar diretório e definir como local de trabalho
WORKDIR /var/www/laravel

# Copiar arquivos do projeto
COPY . .

# Instalar dependências PHP
RUN composer install --no-dev --optimize-autoloader

# Dar permissões corretas
RUN chown -R www-data:www-data /var/www/laravel/storage /var/www/laravel/bootstrap/cache

# Configurar o Apache
RUN echo "<VirtualHost *:8080>\n\
    ServerName localhost\n\
    DocumentRoot /var/www/laravel/public\n\
    <Directory /var/www/laravel/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    ErrorLog /var/log/apache2/error.log\n\
    CustomLog /var/log/apache2/access.log combined\n\
</VirtualHost>" > /etc/apache2/sites-available/000-default.conf

RUN echo 'DirectoryIndex index.php index.html' >> /etc/apache2/apache2.conf

EXPOSE 8080
CMD ["apache2-foreground"]
