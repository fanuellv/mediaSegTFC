FROM php:8.2-apache

# Instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip unzip git && \
    docker-php-ext-install pdo_mysql && \
    a2enmod rewrite

# Configurar Apache para apontar para a pasta /public do Laravel
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Copiar o projeto para dentro do container
COPY . /var/www/html

# Ajustar permissões para o Apache ler e executar
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Configurar porta padrão (Render usa 8080)
ENV PORT=8080
RUN echo "Listen ${PORT}" > /etc/apache2/ports.conf
EXPOSE ${PORT}

CMD ["apache2-foreground"]
