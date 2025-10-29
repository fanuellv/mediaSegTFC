# Usa imagem PHP com Apache
FROM php:8.2-apache

# Instala extensões necessárias
RUN docker-php-ext-install pdo pdo_mysql

# Copia os arquivos do Laravel
COPY . /var/www/html

# Define permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Ativa o módulo rewrite do Apache
RUN a2enmod rewrite

# Define o diretório público como raiz do Apache
WORKDIR /var/www/html
RUN echo "<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>" > /etc/apache2/sites-available/000-default.conf

# Expõe a porta
EXPOSE 80

# Inicia o Apache
CMD ["apache2-foreground"]
