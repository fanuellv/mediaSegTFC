FROM php:8.2-apache

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_pgsql zip

# Habilitar o mod_rewrite (necessário para Laravel)
RUN a2enmod rewrite

# Copiar os arquivos do projeto para o container
COPY . /var/www/html
WORKDIR /var/www/html

# Instalar o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar dependências do Laravel (sem dev)
RUN composer install --no-dev --optimize-autoloader

# Corrigir permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Alterar o DocumentRoot para /public
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Garantir que o mod_rewrite funcione dentro da pasta public
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/laravel.conf \
    && a2enconf laravel

# Adicionar ServerName para remover warnings
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Expor a porta dinâmica (Render define via $PORT)
EXPOSE 10000

# Corrigir porta do Apache e iniciar
CMD sed -i "s/80/\${PORT}/g" /etc/apache2/ports.conf && apache2-foreground
