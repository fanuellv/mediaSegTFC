# Etapa base com PHP e Apache
FROM php:8.2-apache

# Instalar dependências essenciais
RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libjpeg-dev libfreetype6-dev zip \
    && docker-php-ext-install pdo pdo_mysql

# Ativar mod_rewrite e configurar Apache para Laravel
RUN a2enmod rewrite
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copiar o projeto Laravel
COPY . /var/www/html

# Permissões adequadas
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instalar dependências do Laravel (sem dev)
RUN composer install --no-dev --optimize-autoloader

# Definir a porta dinâmica (Render usa variável $PORT)
ENV PORT=8080
RUN sed -i "s/80/${PORT}/g" /etc/apache2/ports.conf /etc/apache2/sites-available/000-default.conf
EXPOSE ${PORT}

# Iniciar Apache
CMD ["apache2-foreground"]
