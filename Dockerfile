FROM php:8.2-apache

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_pgsql zip

# Habilitar o mod_rewrite para o Laravel
RUN a2enmod rewrite

# Copiar os arquivos do projeto
COPY . /var/www/html
WORKDIR /var/www/html

# Instalar o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Ajustar permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Configurar o Apache para apontar para a pasta 'public'
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Adicionar ServerName para evitar warnings
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Expor a porta do Render
EXPOSE 10000

# Corrigir porta dinâmica e iniciar o Apache
CMD sed -i "s/80/\${PORT}/g" /etc/apache2/ports.conf && apache2-foreground
