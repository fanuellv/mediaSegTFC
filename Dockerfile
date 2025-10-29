FROM php:8.2-apache

# Instala dependências
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_pgsql zip

# Habilita mod_rewrite (para o Laravel)
RUN a2enmod rewrite

# Copia o projeto
COPY . /var/www/html
WORKDIR /var/www/html

# Instala o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Define a pasta pública como raiz do Apache
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Expõe a porta padrão do Render
EXPOSE 10000

# Corrige a porta dinamicamente e inicia o Apache
CMD sed -i "s/80/\${PORT}/g" /etc/apache2/ports.conf && apache2-foreground
