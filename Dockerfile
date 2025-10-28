FROM php:8.2-apache

# Instala dependências
RUN docker-php-ext-install pdo pdo_mysql

# Define a porta
ENV PORT=8080
RUN echo "Listen ${PORT}" > /etc/apache2/ports.conf

# Copia o código para o container
COPY . /var/www/html

# Configura o DocumentRoot para o Laravel
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Permissões
RUN chown -R www-data:www-data /var/www/html

# Expõe a porta
EXPOSE ${PORT}

# Inicia o Apache
CMD ["apache2-foreground"]
