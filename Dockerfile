FROM php:8.2-apache

# Instala dependências e extensões
RUN docker-php-ext-install pdo pdo_mysql

# Define a porta padrão e corrige o ports.conf
ENV PORT=8080
RUN echo "Listen ${PORT}" > /etc/apache2/ports.conf

# Copia os arquivos do projeto
COPY . /var/www/html

# Dá permissão
RUN chown -R www-data:www-data /var/www/html

# Expõe a porta
EXPOSE ${PORT}

# Inicia o Apache
CMD ["apache2-foreground"]
